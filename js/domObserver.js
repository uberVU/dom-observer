define([], function () {
    var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;

    var DOMObserver = function (addedNodeHandler, removedNodeHandler,
                                mutationHandler, attributeFilter) {

        this.addedNodeHandler = addedNodeHandler;
        this.removedNodeHandler = removedNodeHandler;
        this.mutationHandler = mutationHandler;
        this.attributeFilter = attributeFilter;

        if (MutationObserver) {
            this.observer = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];
                    // handle added nodes
                    Array.prototype.forEach.call(mutation.addedNodes, addedNodeHandler);
                    // handle removed nodes
                    Array.prototype.forEach.call(mutation.removedNodes, removedNodeHandler);
                    // handle changed node
                    mutationHandler(mutation);
                }
                return false;
            });

            this.observer.observe(document, {
                childList: true,
                subtree: true,
                attributes: true, // Listen for attribute changes as well.
                attributeOldValue: true, // Pass in the old attribute value
                attributeFilter: attributeFilter
            });
        } else if (document.addEventListener) {
            document.addEventListener("DOMNodeInserted", addedNodeHandlert);
            document.addEventListener("DOMNodeRemoved", removedNodeHandler);
            document.addEventListener("DOMAttrModified", mutationHandler);
        } else {
            console.log("DOM Observer does not support this browser.");
        }
    };

    DOMObserver.prototype = {
        shutdown: function () {
            if (MutationObserver) {
                this.observer.disconnect();
            } else {
                document.addEventListener("DOMNodeInserted", this.addedNodeHandlert);
                document.addEventListener("DOMNodeRemoved", this.removedNodeHandler);
                document.addEventListener("DOMAttrModified", this.mutationHandler);
            }
        }
    };

    return DOMObserver;
});
