"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var platform = require("tns-core-modules/platform");
var context;
var numberOfImagesCreated = 0;
var REQUEST_CODE = 99;
var FileProviderPackageName = useAndroidX() ? global.androidx.core.content : android.support.v4.content;
function getIntent(type) {
    var intent = new android.content.Intent(android.content.Intent.ACTION_SEND);
    intent.setType(type);
    return intent;
}
function share(intent, subject) {
    return new Promise(function (resolve) {
        context = application.android.context;
        subject = subject || "How would you like to share this?";
        var shareIntent = android.content.Intent.createChooser(intent, subject);
        shareIntent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        var activity = context;
        activity.onActivityResult = function (requestCode, resultCode, data) {
            if (requestCode === REQUEST_CODE)
                if (resultCode === android.app.Activity.RESULT_OK)
                    resolve(true);
                else if (resultCode === android.app.Activity.RESULT_CANCELED)
                    resolve(false);
        };
        activity.startActivityForResult(shareIntent, REQUEST_CODE);
    });
}
function useAndroidX() {
    return global.androidx && global.androidx.appcompat;
}
function shareImage(image, subject) {
    return __awaiter(this, void 0, void 0, function () {
        var intent, stream, imageFileName, newFile, fos, shareableFileUri, sdkVersionInt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numberOfImagesCreated++;
                    context = application.android.context;
                    intent = getIntent("image/jpeg");
                    stream = new java.io.ByteArrayOutputStream();
                    image.android.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, stream);
                    imageFileName = "socialsharing" + numberOfImagesCreated + ".jpg";
                    newFile = new java.io.File(context.getExternalFilesDir(null), imageFileName);
                    fos = new java.io.FileOutputStream(newFile);
                    fos.write(stream.toByteArray());
                    fos.flush();
                    fos.close();
                    sdkVersionInt = parseInt(platform.device.sdkVersion);
                    if (sdkVersionInt >= 21) {
                        shareableFileUri = FileProviderPackageName.FileProvider.getUriForFile(context, application.android.nativeApp.getPackageName() + ".provider", newFile);
                    }
                    else {
                        shareableFileUri = android.net.Uri.fromFile(newFile);
                    }
                    intent.putExtra(android.content.Intent.EXTRA_STREAM, shareableFileUri);
                    return [4, share(intent, subject)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareImage = shareImage;
function shareText(text, subject) {
    return __awaiter(this, void 0, void 0, function () {
        var intent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    intent = getIntent("text/plain");
                    intent.putExtra(android.content.Intent.EXTRA_TEXT, text);
                    return [4, share(intent, subject)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareText = shareText;
function shareUrl(url, text, subject) {
    return __awaiter(this, void 0, void 0, function () {
        var intent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    intent = getIntent("text/plain");
                    intent.putExtra(android.content.Intent.EXTRA_TEXT, url);
                    intent.putExtra(android.content.Intent.EXTRA_SUBJECT, text);
                    return [4, share(intent, subject)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.shareUrl = shareUrl;
//# sourceMappingURL=social-share.android.js.map