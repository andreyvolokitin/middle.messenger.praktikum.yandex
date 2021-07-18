import '../src/store/storeInstance';

// import '../src/pages/main-page';
import '../src/pages/chat-view';
import '../src/pages/profile-page';
import '../src/pages/profile-edit-page';
import '../src/pages/profile-edit-password-page';
import '../src/pages/login';
import '../src/pages/signup';
import '../src/pages/page-404';
import '../src/pages/page-500';

import RootController from '../src/controllers/RootController';

const rootController = new RootController();

rootController.boot();
