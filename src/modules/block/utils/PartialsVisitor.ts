import Handlebars from '@andreyvolokitin/handlebars.js';
import { nanoid } from 'nanoid';

import getObjectValue from '../../../utils/getObjectValue';
import { COMPONENT_CLASSNAME, COMPONENT_COPY_SUFFIX } from '../const';
import setObjectValue from '../../../utils/setObjectValue';
import trim from '../../../utils/trim';

/**
 * Собрать метаданные partials, использующихся в шаблоне. Обработать и вернуть AST и метаданные.
 *
 * Метаданные содержат:
 * - имя, соответствует имени конструктора компонента (кроме первой буквы, у конструктора она заглавная, у имени нет)
 * - алиас, под которым будет храниться инстанс компонента (генерируется, или указывается параметром `_alias` у partial)
 * - параметры, переданные в partial в шаблоне
 * - путь к итерируемому объекту/массиву (если partial находится внутри цикла) и имя задаваемого итерацией параметра
 * - AST детей (если внутрь partial-блока передаётся разметка, используемая через @partial-block внутри partial)
 *
 * Обработка AST включает:
 * - замену partials на заглушки, для последующей замены на DOM-узел компонента.
 * - замену директивы @partial-block на AST, переданное в параметре `children`
 * - рекурсивную обработку AST, переданного в параметре `children`
 */
export default class PartialsVisitor extends Handlebars.Visitor {
  public mutating: boolean;

  public parents: (hbs.AST.Program | hbs.AST.BlockStatement)[];

  public partials: PartialMetadata[];

  public inlinePartialsNames: string[] = [];

  private readonly _children?: hbs.AST.Program;

  constructor(children?: hbs.AST.Program, isMutating = false) {
    super();
    this.partials = [];
    this._children = children;
    this.mutating = isMutating;
  }

  getPartialMeta(
    partial: hbs.AST.PartialStatement | hbs.AST.PartialBlockStatement
  ): PartialMetadata {
    const partialName = (partial.name as hbs.AST.PathExpression).original;
    const meta = {
      name: partialName,
      params: {},
    } as PartialMetadata;
    const parentEachStatement = this.parents.find(
      (parent) =>
        parent.type === 'BlockStatement' &&
        (parent as hbs.AST.BlockStatement).path.original === 'each'
    ) as hbs.AST.BlockStatement;

    if (parentEachStatement) {
      meta.iterated = {
        source: (parentEachStatement.params[0] as hbs.AST.PathExpression).original,
        param: parentEachStatement.program.blockParams[0],
      };
    }

    if (partial.hash) {
      partial.hash.pairs.forEach(({ key, value }) => {
        let propValue;

        if (value.type === 'PathExpression') {
          const pathValue = (value as hbs.AST.PathExpression).original;
          const trimmedPathValue = trim(pathValue, './');

          propValue =
            meta.iterated &&
            key === meta.iterated.param &&
            pathValue.startsWith(`${meta.iterated.param}.`)
              ? {
                  get() {
                    return getObjectValue(this, pathValue);
                  },
                  set(val: unknown) {
                    setObjectValue(this, pathValue, val);
                  },
                }
              : {
                  get() {
                    return getObjectValue(this.__parent, trimmedPathValue);
                  },
                  set(val: unknown) {
                    setObjectValue(this.__parent, trimmedPathValue, val);
                  },
                };
        } else {
          propValue = {
            value: (value as hbs.AST.StringLiteral).original,
            writable: true,
          };
        }

        Object.defineProperty(meta.params, key, {
          enumerable: true,
          configurable: true,
          ...propValue,
        });
      });
    }

    let alias = `${partialName}_${nanoid()}`;

    if (meta.params && meta.params._alias) {
      alias = meta.params._alias as string;
      delete meta.params._alias;
    }

    meta.alias = alias;

    if (partial.type === 'PartialBlockStatement' && partial.program) {
      meta.children = partial.program;
    }

    return meta;
  }

  processPartial(
    partial: hbs.AST.PartialStatement | hbs.AST.PartialBlockStatement
  ): hbs.AST.Program | false {
    const meta = this.getPartialMeta(partial);

    // Заменить `@partial-block` на AST, переданное в свойстве `props.children`
    // (или удалить, если свойство не определено)
    if (meta.name === '@partial-block') {
      if (!this._children) {
        return false;
      }

      // обработать вставляемое AST
      const innerVisitor = new PartialsVisitor(undefined, true);

      innerVisitor.accept(this._children as hbs.AST.Program);
      this.partials.push(...innerVisitor.partials);

      return this._children;
    }

    this.partials.push(meta);

    // Заменить partial заглушкой с id
    return Handlebars.parseWithoutProcessing(
      `<i class="${COMPONENT_CLASSNAME}" id="${meta.alias}{{#isnt @index null}}${COMPONENT_COPY_SUFFIX}{{@index}}{{/isnt}}"></i>`
    );
  }

  PartialStatement(partial: hbs.AST.PartialStatement): hbs.AST.Program | false | undefined {
    const isInlinePartial =
      this.inlinePartialsNames.indexOf((partial.name as hbs.AST.PathExpression).original) !== -1;

    if (isInlinePartial) {
      return undefined;
    }

    return this.processPartial(partial);
  }

  PartialBlockStatement(partialBlock: hbs.AST.PartialBlockStatement): hbs.AST.Program | false {
    return this.processPartial(partialBlock);
  }

  DecoratorBlock(block: hbs.AST.DecoratorBlock): void {
    if (block.path.original === 'inline') {
      this.inlinePartialsNames.push((block.params[0] as hbs.AST.StringLiteral).original);
    }

    super.DecoratorBlock(block);
  }
}
