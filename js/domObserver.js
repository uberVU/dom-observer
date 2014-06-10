(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    window.DOMObserver = factory();
  }
}(this, function() {
    var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;

    /* @param node DOM node on which to observe mutations
     * @param opts object with following possible keys:
     *    addedNodeHandler - takes a DOM node (that was added)
     *    removedNodeHandler - takes a DOM node (that was removed)
     *    mutationHandler - takes a DOM node (that was changed)
     *    attributeFilter - array of attribute names that should be observed
     */
    var DOMObserver = function (node, opts) {
        if (MutationObserver) {
            this.observer = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];
                    // handle added nodes
                    if (opts.addedNodeHandler) {
                      Array.prototype.forEach.call(mutation.addedNodes, opts.addedNodeHandler);
                    }
                    // handle removed nodes
                    if (opts.removedNodeHandler) {
                      Array.prototype.forEach.call(mutation.removedNodes, opts.removedNodeHandler);
                    }
                    // handle changed node
                    if (opts.mutationHandler) {
                      opts.mutationHandler(mutation);
                    }
                }
                return false;
            });

            this.observer.observe(node, {
                childList: true,
                subtree: true,
                attributes: true, // Listen for attribute changes as well.
                attributeOldValue: true, // Pass in the old attribute value
                attributeFilter: opts.attributeFilter
            });
        } else if (document.addEventListener) {
            node.addEventListener("DOMNodeInserted", opts.addedNodeHandler);
            node.addEventListener("DOMNodeRemoved", opts.removedNodeHandler);
            node.addEventListener("DOMAttrModified", opts.mutationHandler);
        } else {
            console.log("DOM Observer does not support this browser.");
        }
    };

    DOMObserver.prototype = {
        shutdown: function () {
            if (MutationObserver) {
                this.observer.disconnect();
            } else {
                node.removeEventListener("DOMNodeInserted", opts.addedNodeHandlert);
                node.removeEventListener("DOMNodeRemoved", opts.removedNodeHandler);
                node.removeEventListener("DOMAttrModified", opts.mutationHandler);
            }
        }
    };

    return DOMObserver;
}));
