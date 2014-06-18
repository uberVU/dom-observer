describe('DOMObserver', function () {
  var container = document.createElement('div');
  document.body.appendChild(container);
  var node = null;
  beforeEach(function () {
    // create the DOM node
    node = document.createElement('div');
    node.id = 'node';
    container.appendChild(node);
  });

  afterEach(function () {
    container.innerHTML = null;

  });

  it('should call the handler on add', function (done) {
    var observer = new DOMObserver(document.querySelector('#node'), {
      addedNodeHandler: function (addedNode) {
        done();
      },
    });
    node.appendChild(document.createElement('p'));
  });

  it('should call the handler on remove', function (done) {
    node.appendChild(document.createElement('p'));
    var observer = new DOMObserver(document.querySelector('#node'), {
      removedNodeHandler: function (removedNode) {
        done();
      },
    });
    node.innerHTML = null;
  });

  it('should call the handler on change', function (done) {
    var p = document.createElement('p');
    node.appendChild(p);
    var observer = new DOMObserver(document.querySelector('#node'), {
      mutationHandler: function (changedNode) {
        done();
      },
    });
    p.dataset.test = 2;
  });

  it('should respect the attributeFilter for changes', function (done) {
    var p = document.createElement('p');
    node.appendChild(p);
    var observer = new DOMObserver(document.querySelector('#node'), {
      attributeFilter: ['data-test'],
      mutationHandler: function (changedNode) {
        done();
      },
    });
    p.dataset.test_fake = 2;
    p.dataset.test = 2;
  });

  it('should properly shutdown', function (done) {
    var observer = new DOMObserver(document.querySelector('#node'), {
      addedNodeHandler: function (addedNode) {
        done();
      },
    });
    node.appendChild(document.createElement('p'));
    setTimeout(function () {
      observer.shutdown();
      node.appendChild(document.createElement('p'));
    }, 200);
  });
});
