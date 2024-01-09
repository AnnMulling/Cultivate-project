
export default function pageVisibilityApi () {
    
    if (typeof document.hidden !== undefined) {
        hidden = "hidden";
        visibilityChange = "visibilityChange";
    }else if (typeof document.msHidden !== undefined) {
        hidden = "msHidden";
        visibilityChange = "msVisibilityChange"
    }else if (typeof document.webkitHidden !== undefined) {
        hidden = "webkitHidden";
        visibilityChange = "webkitVisibilityChange"
    }

    return { hidden, visibilityChange }
}
