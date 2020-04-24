"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("tns-core-modules/utils/utils");
var frame_1 = require("tns-core-modules/ui/frame");
function share(thingsToShare) {
    return new Promise(function (resolve, reject) {
        var activityController = UIActivityViewController.alloc()
            .initWithActivityItemsApplicationActivities(thingsToShare, null);
        activityController.completionWithItemsHandler = function (type, shared, returnedItems, error) {
            if (error)
                reject(error.localizedDescription);
            resolve(shared);
        };
        var presentViewController = activityController.popoverPresentationController;
        if (presentViewController) {
            var page = frame_1.Frame.topmost().currentPage;
            if (page && page.ios.navigationItem.rightBarButtonItems &&
                page.ios.navigationItem.rightBarButtonItems.count > 0) {
                presentViewController.barButtonItem = page.ios.navigationItem.rightBarButtonItems[0];
            }
            else {
                presentViewController.sourceView = page.ios.view;
            }
        }
        var app = UIApplication.sharedApplication;
        var window = app.keyWindow || (app.windows && app.windows.count > 0 && app.windows[0]);
        var rootController = window.rootViewController;
        utils_1.ios.getVisibleViewController(rootController)
            .presentViewControllerAnimatedCompletion(activityController, true, null);
    });
}
function shareImage(image) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, share([image])];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareImage = shareImage;
function shareText(text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, share([text])];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareText = shareText;
function shareUrl(url, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, share([NSURL.URLWithString(url), text])];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareUrl = shareUrl;
//# sourceMappingURL=social-share.ios.js.map