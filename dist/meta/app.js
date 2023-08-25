// @ts-ignore
import { status_write } from "render-status";
import { reloadStyle } from "../library/style/style";
var App = /** @class */ (function () {
    function App() {
    }
    //更改会话样式
    App.prototype.setTheme = function (theme) {
        status_write({
            type: "session",
            fields: {
                theme: theme
            }
        });
        reloadStyle(theme);
    };
    return App;
}());
export { App };
