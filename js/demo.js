function printToBox(message) {
    var p = $("<p></p>");
    var messageBox = $("#message-box");
    p.text(message);
    messageBox.append(p);
    messageBox.stop().animate({scrollTop: messageBox.prop('scrollHeight')}, 300);
}

window.onload = function () {
    var observer = new DOMObserver($("#test-div")[0], {
        addedNodeHandler: function (addedNode, m) {
            printToBox("Added node: " + addedNode);
            console.log("Added node:");
            console.log(addedNode);
            console.log("Mutation:");
            console.log(m);
        },
        removedNodeHandler: function (removedNode, m) {
            printToBox("Removed node: " + removedNode);
            console.log("Removed node:");
            console.log(removedNode);
            console.log("Mutation:");
            console.log(m);
        },
        mutationHandler: function (changedNode, m) {
            printToBox("Changed node: " + changedNode);
            console.log("Changed node:");
            console.log(changedNode);
            console.log("Mutation:");
            console.log(m);
        }
    });
};

