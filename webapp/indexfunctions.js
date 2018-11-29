
function main(container, outline, toolbar, sidebar, status) {
    // the following lines makes the GetcurVal() call if <p id is changed (when
    // tk value updates)
    var target = document.querySelector("p");
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            GetcurVal();
        });
    });

    var config = {
        childList: true,
        subtree: true,
        characterData: true
    };

    observer.observe(target, config);

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
        return;
    }

    // If connect preview is not moved away then getCellAt is used to detect
    // the cell under the mouse if the mouse is over the preview shape in IE
    // (no event transparency), ie. the built-in hit-detection of the HTML
    // document will not be used in this case.
    mxConnectionHandler.prototype.movePreviewAway = false;
    mxConnectionHandler.prototype.waypointsEnabled = true;
    mxGraph.prototype.resetEdgesOnConnect = false;

    // Enables guides
    mxGraphHandler.prototype.guidesEnabled = true;

    // Alt disables guides
    mxGuide.prototype.isEnabledForEvent = function(evt) {
        return !mxEvent.isAltDown(evt);
    };

    // Enables snapping waypoints to terminals
    mxEdgeHandler.prototype.snapToTerminals = true;

    // Assigns some global constants for general behaviour, eg. minimum size
    // (in pixels) of the active region for triggering creation of new
    // connections, the portion (100%) of the cell area to be used for
    // triggering new connections, as well as some fading options for windows
    // and the rubberband selection.
    mxConstants.MIN_HOTSPOT_SIZE = 16;
    mxConstants.DEFAULT_HOTSPOT = 1;

    // Workaround for Internet Explorer ignoring certain CSS directives
    if (mxClient.IS_QUIRKS) {
        document.body.style.overflow = 'hidden';
        new mxDivResizer(container);
        new mxDivResizer(outline);
        new mxDivResizer(toolbar);
        new mxDivResizer(sidebar);
        new mxDivResizer(status);
    }

    // Creates a wrapper editor with a graph inside the given container. The
    // editor is used to create certain functionality for the graph, such as
    // the rubberband selection, but most parts of the UI are custom in this
    // example.
    editor = new mxEditor();
    var graph = editor.graph;
    var model = graph.getModel();

    /*
     * Maverick
     * The following variable 'diagRoot' serves as the root element for the
     * entire diagram.
     */
    var diagRoot = new XcosDiagram(null, model, null);
    graph.setPanning(true);
    graph.setConnectable(true);
    graph.setConnectableEdges(true);
    graph.setDisconnectOnMove(false);
    graph.foldingEnabled = false;

    // Disable highlight of cells when dragging from toolbar
    graph.setDropEnabled(true);
    // Centers the port icon on the target port
    graph.connectionHandler.targetConnectImage = true;

    // Does not allow dangling edges
    graph.setAllowDanglingEdges(false);

    // Sets the graph container and configures the editor
    editor.setGraphContainer(container);

    // Disables built-in context menu
    mxEvent.disableContextMenu(document.body);

    // Configures automatic expand on mouseover
    graph.panningHandler.autoExpand = true;

    /*
     * @jiteshjha, @pooja
     * Overrides mxGraphModel.getStyle to return a specific style for edges
     * that reflects their target terminal.
     */

    graph.model.getStyle = function(cell) {
        var style = null;
        if (cell != null) {
            // Get style for the recently created mxCell.
            style = mxGraphModel.prototype.getStyle.apply(this, arguments);
            // If the mxCell is an edge and if it's a fully formed edge
            if (this.isEdge(cell) && cell.source != null) {
                var target = this.getTerminal(cell, false);
                if (target != null) {
                    /*
                     * cell.name attribute defines the link name so that it can
                     * be parsed in the XML during XSLT transformation.
                     */
                    var cellSource = cell.source;
                    while (cellSource.isEdge() == true) {
                        cellSource = cellSource.source;
                    }
                    if (cellSource.value == "ExplicitOutputPort" || cellSource.value == "ExplicitInputPort") {
                        if (style == null) {
                            style = 'ExplicitLink' + ';';
                        }
                        cell.name = "ExplicitLink";
                    } else if (cellSource.value == "ImplicitOutputPort" || cellSource.value == "ImplicitInputPort") {
                        if (style == null) {
                            style = 'ImplicitLink' + ';';
                        }
                        cell.name = "ImplicitLink";
                    } else if (cellSource.value == "CommandPort" || cellSource.value == "ControlPort") {
                        if (style == null) {
                            style = 'CommandControlLink' + ';';
                        }
                        cell.name = "CommandControlLink";
                    }
                }
            }
        }
        return style;
    };

    // Creates a right-click menu
    graph.panningHandler.factoryMethod = function(menu, cell, evt) {
        if (cell != null) {
            // @ToDo: Pooja: Different edge value cases.
            if (cell.value == "ExplicitInputPort" || cell.value == "ExplicitOutputPort" || cell.value == "CommandPort" || cell.value == "ControlPort") {
            } else if (cell.isEdge() == true)
            {
                menu.addItem('Delete', 'images/delete2.png', function() {
                    editor.execute('deleteBlock');
                });
                var edgeformat = menu.addItem('Format', null, null);

                menu.addItem('Border Color', 'images/draw-brush.png', function() {
                    showColorWheel(graph, cell, 'edgeStrokeColor');
                }, edgeformat);
                menu.addItem('Text and Text Font', 'images/edit.png', function() {
                    showTextEditWindow(graph, cell);
                }, edgeformat);
                menu.addItem('Text Color', 'images/edit.png', function() {
                    showColorWheel(graph, cell, 'edgeTextColor');
                }, edgeformat);
            } else {
                menu.addItem('Block Parameters...', 'images/gear.gif', function() {
                    showPropertiesWindow(graph, cell,diagRoot);
                });

                menu.addItem('Cut', 'images/cut.png', function() {
                    editor.execute('cut');
                });
                menu.addItem('Copy', 'images/copy.png', function() {
                    editor.execute('copy');
                });
                menu.addItem('Delete', 'images/delete2.png', function() {
                    editor.execute('delete');
                });

                menu.addItem('Selection to superblock', 'images/superblock.png', function() {
                    // @ToDo: Functionality to be put.
                });
                var formatMenu = menu.addItem('Format', null, null);
                menu.addItem('Rotate', 'images/rotate.png', function() {
                    editor.execute('rotateCustom');
                }, formatMenu);
                menu.addItem('Flip', 'images/flip.png', function() {
                    editor.execute('flipCustom');
                }, formatMenu);
                menu.addItem('Mirror', 'images/mirror.png', function() {
                    editor.execute('mirrorCustom');
                }, formatMenu);
                menu.addItem('Border Color', 'images/draw-brush.png', function() {
                    showColorWheel(graph, cell, 'vertexStrokeColor');
                }, formatMenu);
                menu.addItem('Fill Color', 'images/edit.png', function() {
                    showColorWheel(graph, cell, 'vertexFillColor');
                }, formatMenu);
                menu.addItem('Details', null, function() {
                    // @ToDo: Functionality to be put.
                });
            }
        } else {
            menu.addItem('Undo', 'images/undo.png', function() {
                editor.execute('undo');
            });
            menu.addItem('Redo', 'images/redo.png', function() {
                editor.execute('redo');
            });
            menu.addItem('Paste', 'images/paste.png', function() {
                editor.execute('paste');
            });

            menu.addItem('Select all', 'images/selectall.png', function() {
                editor.execute('selectAll');
            });

            /*
             * Maverick
             * Added one more parameter to the setContext function.
             */
            menu.addItem('Set Context', null, function() {
                showSetContext(graph, diagRoot);
            });

            /*
             * Maverick
             * Added one more parameter to the setContext function.
             */
            menu.addItem('Setup', 'images/setup.png', function() {
                showSetupWindow(graph, diagRoot);
            });

            menu.addItem('Zoom In', 'images/zoom_in.png', function() {
                editor.execute('zoomIn');
            });
            menu.addItem('Zoom Out', 'images/zoom_out.png', function() {
                editor.execute('zoomOut');
            });
            menu.addItem('Diagram background...', null, function() {
                showColorWheel(graph, cell, 'bgColor');
            });
        }
    };

    // var config = mxUtils.load('config/editor-commons.xml').getDocumentElement();
    var config = mxUtils.load('config/keyhandler-commons.xml').getDocumentElement();
    editor.configure(config);

    graph.isCellSelectable = function(cell) {
        if (cell.isConnectable() == true && cell.isEdge() == false) {
            return false;
        }
        return true;
    };

    graph.resizeCell = function(cell, bounds, recurse) {
        if (cell.getStyle() == 'Split') {
            return null;
        } else {
            return mxGraph.prototype.resizeCell.apply(this, arguments);
        }
    }

    /*
     * For a new edge on the graph, check if that edge satisfies one of the
     * port constraints.  Possible edge cases with source & target :
     * 1) Source : Port, Target : Port
     * 2) Source : Edge, Target : Port
     * 3) Source : Port, Target : Edge
     * 4) Source : Edge, Target : Edge
     */
    graph.addEdge = function(edge, parent, source, target, index) {
        if (source.isEdge() == true && target.isEdge() == true) {
            alert("Illegal connection! - Link to link connection");
            return null;
        }

        // If the edge is legit, return the edge.
        if (source.isEdge() == true) {
            graph.getModel().beginUpdate();
            try {
                var edgeSource = source;

                // While the source of the edge is an edge, find the final
                // port
                while (edgeSource.isEdge() == true) {
                    edgeSource = edgeSource.source;
                }

                // If the edge violates any of the port constraints, don't
                // create the edge
                if (edgeSource.value == "ExplicitOutputPort" && target.value != "ExplicitInputPort") {
                    alert("Explicit data output port must be connected to explicit data input port");
                    return null;
                } else if (edgeSource.value == "ExplicitInputPort" && target.value != "ExplicitOutputPort") {
                    alert("Explicit data input port must be connected to explicit data output port");
                    return null;
                }
                // else if (edgeSource.value == "ImplicitOutputPort" && target.value != "ImplicitInputPort") {
                // alert("Implicit data output port must be connected to implicit data input port");
                // return null;
                // } else if (edgeSource.value == "ImplicitInputPort" && target.value != "ImplicitOutputPort") {
                // alert("Implicit data input port must be connected to implicit data output port");
                // return null;
                // } else if (edgeSource.value == "CommandPort" && target.value != "ControlPort") {
                //    alert("Command port must be connected to control port");
                //   return null;
                // } else if (edgeSource.value == "ControlPort" && target.value != "CommandPort") {
                //   alert("Control port must be connected to command port");
                //   return null;
                // }

                // Create the splitBlock
                // (x-5, y-5.5) is the offset to correct the position of
                // split-block
                var cell = graph.insertVertex(graph.getDefaultParent(), null, '', source.sourcePoint.x - 5, source.sourcePoint.y - 5.5, 10, 10, 'Split', false);

                // Get the source state
                var sourceState = graph.view.getState(source);
                var waypoints = source.waypoints;
                var waypoints1 = [];

                // Add the absolute points for source edge to waypoints
                // variable
                for (i in sourceState.absolutePoints) {
                    waypoints1.push(sourceState.absolutePoints[i]);
                }

                // Remove source and target points
                waypoints1.shift();
                waypoints1.pop();

                // Store the waypoints to the source edge
                waypoints = waypoints1;

                // Find the index in the waypoints nearest to the split-block
                var seg = mxUtils.findNearestSegment(sourceState, source.sourcePoint.x, source.sourcePoint.y);
                var sourceTarget = source.target;

                // Set the type of ports for split-block according to type of
                // source edge
                if (edgeSource.value == 'ExplicitOutputPort') {
                    createPorts(graph, cell, ['E'], [], ['E'], ['E']);
                } else if (edgeSource.value == 'ImplicitOutputPort') {
                    createPorts(graph, cell, ['I'], [], ['I', 'I'], []);
                } else {
                    createPorts(graph, cell, ['CONTROL'], [], ['COMMAND', 'COMMAND'], []);
                }

                // Source edge is replaced with first edge and futureSource
                // edges
                cell.name = 'SPLIT_f';

                // Hide all the ports of a split-block
                cell.getChildAt(0).setVisible(false);
                cell.getChildAt(1).setVisible(false);
                cell.getChildAt(2).setVisible(false);

                // Remove the current source
                graph.removeCells([source], true);

                /*
                 * If there are any waypoints, divide them for the two newly
                 * created edges.  The two newly created edges are inherited
                 * from the source edge
                 */
                if (waypoints != null) {
                    var waypoints1 = [];
                    for (var i = 0; i < seg; i++) {
                        waypoints1.push(waypoints[i]);
                    }

                    var waypoints2 = [];
                    for (var i = seg; i < waypoints.length; i++) {
                        waypoints2.push(waypoints[i]);
                    }
                }

                // Find the waypoints of the current edge, and set the
                // waypoints for the new thirdEdge
                var waypoints3 = edgeState.absolutePoints;
                if (waypoints3 != null && waypoints3.length > 1) {
                    // Remove last absolute point
                    waypoints3.pop();
                }

                // Create three edges associated with the split-block
                var firstEdge = createEdgeObject(graph, cell.getChildAt(1), sourceTarget, waypoints2);
                var thirdEdge = createEdgeObject(graph, cell.getChildAt(2), target, waypoints3);
                var futureSource = createEdgeObject(graph, source.source, cell.getChildAt(0), waypoints1);

                // Set the newly made futureSource as the source
                source = futureSource;

                // Connectable for the ports and the split-block should be
                // false
                cell.getChildAt(0).setConnectable(false);
                cell.getChildAt(1).setConnectable(false);
                cell.getChildAt(2).setConnectable(false);
                cell.setConnectable(false);

                // Get the parent of the splitBlock
                var parent = graph.model.getParent(cell);

                graph.model.beginUpdate();
                try {
                    /*
                     * Adds the split-block to the parent at the last index
                     * Enables split-block to appear over it's associated edges
                     */
                    graph.model.add(parent, cell, graph.model.getChildCount(parent) - 1);
                } finally {
                    graph.model.endUpdate();
                }

                graph.refresh();
            } finally {
                graph.getModel().endUpdate();
            }

            /*
             * Remove the current edge, as we have already created thirdEdge as
             * its replacement, to enable waypoints.
             */
            return null;
        }

        // If the edge is legit, return the edge.
        if (target.isEdge() == true) {
            graph.getModel().beginUpdate();
            try {
                var edgeSource = target;

                // While the source of the edge is an edge, find the final port
                while (edgeSource.isEdge() == true) {
                    edgeSource = edgeSource.source;
                }

                // If the edge violates any of the port constraints, don't
                // create the edge
                if (source.value == "ExplicitOutputPort" && edgeSource.value != "ExplicitInputPort") {
                    alert("Explicit data output port must be connected to explicit data input port");
                    return null;
                } else if (source.value == "ExplicitInputPort" && edgeSource.value != "ExplicitOutputPort") {
                    alert("Explicit data input port must be connected to explicit data output port");
                    return null;
                }
                // else if (source.value == "ImplicitOutputPort" && edgeSource.value != "ImplicitInputPort") {
                //  alert("Implicit data output port must be connected to implicit data input port");
                //  return null;
                // } else if (source.value == "ImplicitInputPort" && edgeSource.value != "ImplicitOutputPort") {
                //    alert("Implicit data input port must be connected to implicit data output port");
                //    return null;
                // } else if (source.value == "CommandPort" && edgeSource.value != "ControlPort") {
                //   alert("Command port must be connected to control port");
                //   return null;
                // } else if (source.value == "ControlPort" && edgeSource.value != "CommandPort") {
                //    alert("Control port must be connected to command port");
                //    return null;
                // }

                // Create the splitBlock
                // (x-5, y-5.5) is the offset to correct the position of
                // split-block
                var cell = graph.insertVertex(graph.getDefaultParent(), null, '', target.sourcePoint.x - 5, target.sourcePoint.y - 5, 10, 10, 'Split', false);

                // Get the source state
                var sourceState = graph.view.getState(target);
                var waypoints = target.waypoints;
                var waypoints1 = [];

                // Add the absolute points for source edge to waypoints
                // variable
                for (i in sourceState.absolutePoints) {
                    waypoints1.push(sourceState.absolutePoints[i]);
                }
                waypoints1.shift();
                waypoints1.pop();
                waypoints = waypoints1;

                // Find the index in the waypoints nearest to the split-block
                var seg = mxUtils.findNearestSegment(sourceState, target.sourcePoint.x, target.sourcePoint.y);
                var sourceTarget = target.target;

                if (edgeSource.value == 'ExplicitOutputPort') {
                    createPorts(graph, cell, ['E'], [], ['E'], ['E']);
                } else if (edgeSource.value == 'ImplicitOutputPort') {
                    createPorts(graph, cell, ['I'], [], ['I', 'I'], []);
                } else {
                    createPorts(graph, cell, ['CONTROL'], [], ['COMMAND', 'COMMAND'], []);
                }

                // Source edge is replaced with first edge and futureSource
                // edges
                cell.name = 'SPLIT_f';

                // Hide all the ports of a split-block
                cell.getChildAt(0).setVisible(false);
                cell.getChildAt(1).setVisible(false);
                cell.getChildAt(2).setVisible(false);

                // Remove the current source
                graph.removeCells([target], true);

                /*
                 * If there are any waypoints, divide them for the two newly
                 * created edges. The two newly created edges are inherited
                 * from the source edge
                 */
                if (waypoints != null) {
                    var waypoints1 = [];
                    for (var i = 0; i < seg; i++) {
                        waypoints1.push(waypoints[i]);
                    }

                    var waypoints2 = [];
                    for (var i = seg; i < waypoints.length; i++) {
                        waypoints2.push(waypoints[i]);
                    }
                }

                // Find the waypoints of the current edge, and set the
                // waypoints for the new thirdEdge
                var waypoints3 = edgeState.absolutePoints;
                if (waypoints3 != null && waypoints3.length > 1) {
                    waypoints3.pop();
                }
                waypoints3.reverse();

                // Create three edges associated with the split-block
                var firstEdge = createEdgeObject(graph, cell.getChildAt(1), sourceTarget, waypoints2);
                var thirdEdge = createEdgeObject(graph, cell.getChildAt(2), source, waypoints3);
                var futureSource = createEdgeObject(graph, target.source, cell.getChildAt(0), waypoints1);

                // Set the newly made futureSource as the source
                target = futureSource;

                // Connectable for the ports and the split-block should be
                // false
                cell.getChildAt(0).setConnectable(false);
                cell.getChildAt(1).setConnectable(false);
                cell.getChildAt(2).setConnectable(false);
                cell.setConnectable(false);

                // Get the parent of the splitBlock
                var parent = graph.model.getParent(cell);

                graph.model.beginUpdate();
                try {
                    /*
                     * Adds the split-block to the parent at the last index
                     * Enables split-block to appear over it's associated edges
                     */
                    graph.model.add(parent, cell, graph.model.getChildCount(parent) - 1);
                } finally {
                    graph.model.endUpdate();
                }

                graph.refresh();
            } finally {
                graph.getModel().endUpdate();
            }

            /*
             * Remove the current edge, as we have already created thirdEdge as
             * its replacement, to enable waypoints.
             */
            return null;
        }

        // If the newly created edge is related to a splitBlock, make the edge.
        if (source.parent.name == 'SPLIT_f' || target.parent.name == 'SPLIT_f') {
            return mxGraph.prototype.addEdge.apply(this, arguments);
        }

        var edgeSource = source;

        // If the source of the edge is also an edge, find the port.
        while (edgeSource.isEdge() == true) {
            edgeSource = edgeSource.source;
        }

        // For port-to-port edges with port constraint violations, don't create
        // that edge
        if (source.getEdgeCount() > 0 || target.getEdgeCount() > 0) {
            alert("Port is already connected, please select an please select an unconnected port or a valid link");
        } else if (edgeSource.value == "ExplicitOutputPort" && target.value != "ExplicitInputPort") {
            alert("Explicit data output port must be connected to explicit data input port");
        } else if (edgeSource.value == "ExplicitInputPort" && target.value != "ExplicitOutputPort") {
            alert("Explicit data input port must be connected to explicit data output port");
        }
        // else if (edgeSource.value == "ImplicitOutputPort" && target.value != "ImplicitInputPort") {
        //  alert("Implicit data output port must be connected to implicit data input port");
        // } else if (edgeSource.value == "ImplicitInputPort" && target.value != "ImplicitOutputPort") {
        //    alert("Implicit data input port must be connected to implicit data output port");
        // } else if (edgeSource.value == "CommandPort" && target.value != "ControlPort") {
        //   alert("Command port must be connected to control port");
        // } else if (edgeSource.value == "ControlPort" && target.value != "CommandPort") {
        //    alert("Control port must be connected to command port");
        // }
        else {
            /*
             * For reverse edges, (that is, edges from input port to outport) :
             * If the source is input port, and target is an output port
             * NOTE: Manipulation of source object and target object with
             * respect to current edge is not possible, as
             * mxGraph.prototype.addEdge(@parameters) function is called just
             * before the creation of the edge.  Hence, the following code
             * creates a identical new edge to replace the current edge.
             */

            if ((source.value.indexOf('Input') != -1 && target.value.indexOf('Output') != -1) ||
                (target.value == 'CommandPort' && source.value == 'ControlPort')) {
                // Get points for the current edge from the global edgeState
                // object
                var waypoints = edgeState.absolutePoints;

                // Reverse waypoint array
                waypoints.reverse();

                // Create a new edge
                var newEdge = createEdgeObject(graph, target, source, waypoints);

                // Return null for the current edge,

                /*
                 * Return null for the current edge, since we have created a
                 * new edge above to replace it
                 */
                return null;
            }
            // If the edge is legit, return the edge.
            return mxGraph.prototype.addEdge.apply(this, arguments);
        }
        return null;
    }

    // Shows a "modal" window when double clicking a vertex.
    graph.dblClick = function(evt, cell) {
        // Do not fire a DOUBLE_CLICK event here as mxEditor will consume the
        // event and start the in-place editor.
        if (this.isEnabled() &&
            !mxEvent.isConsumed(evt) &&
            cell != null &&
            this.isCellEditable(cell)) {
            if (!this.isHtmlLabel(cell)) {
                this.startEditingAtCell(cell);
            } else {
                /*
                 * var content = document.createElement('div');
                 * content.innerHTML = this.convertValueToString(cell);
                 * showModalWindow(this, 'Properties', content, 400, 300);
                 */
                if (cell.isVertex() == true) {
                    /* Everytime a block's properties is opened,
                     * referenceModelProps is updated */
                    var referenceModel = graph.getModel();
                    var element_count = 0;
                    for (var e in referenceModel.cells)
                    {
                        if (referenceModel.cells.hasOwnProperty(e))
                            if (referenceModel.cells[e].style)
                            {
                                referenceModelProps[element_count++] = {
                                    id: e,
                                    style: referenceModel.cells[e].style
                                };
                            }
                    }
                    modelNextId = referenceModel.nextId;

                    showPropertiesWindow(graph, cell, diagRoot);
                }
            }
        }

        // Disables any default behaviour for the double click
        mxEvent.consume(evt);
    };

    // Returns a shorter label if the cell is collapsed and no label for
    // expanded groups
    graph.getLabel = function(cell) {
        // "supercall"
        var tmp = mxGraph.prototype.getLabel.apply(this, arguments);
        if (this.isCellLocked(cell)) {
            // Returns an empty label but makes sure an HTML element is created
            // for the label (for event processing wrt the parent label)
            return '';
        } else if (this.isCellCollapsed(cell)) {
            var index = tmp.indexOf('</h1>');
            if (index > 0) {
                tmp = tmp.substring(0, index + 5);
            }
        }
        return tmp;
    }

    // Disables HTML labels for swimlanes to avoid conflict for the event
    // processing on the child cells. HTML labels consume events before
    // underlying cells get the chance to process those events.
    //
    // NOTE: Use of HTML labels is only recommended if the specific features of
    // such labels are required, such as special label styles or interactive
    // form fields. Otherwise non-HTML labels should be used by not overidding
    // the following function.
    // See also: configureStylesheet.
    graph.isHtmlLabel = function(cell) {
        return !this.isSwimlane(cell);
    }

    graph.getTooltipForCell = function(cell) {
        var text = null;
        if (cell.isVertex() == true && cell.isConnectable() == false) {
            var name = cell.value.getAttribute('blockElementName');
            var cellvar = cell.blockInstance.instance.details();

            // If cell is a block or ports
            if (cell.source == null && cell.target == null) {
                if (cell.connectable) { // Cell is a Port
                    // @ToDo: Port Number
                    text = 'Style : ' + cell.style + "\n";
                } else { // Cell is a block
                    // @ToDo: Block Name, Simulation, Flip, Mirror
                    // @ToDo: Number of Input, Output, Control, Command Ports
                    var inputPort, outputPort, controlPort, commandPort;
                    if (cellvar.model.in.height == null) {
                        inputPort = 0;
                    } else {
                        inputPort = cellvar.model.in.height;
                    }
                    if (cellvar.model.out.height == null) {
                        outputPort = 0;
                    } else {
                        outputPort = cellvar.model.out.height;
                    }
                    if (cellvar.model.evtin.height == null) {
                        controlPort = 0;
                    } else {
                        controlPort = cellvar.model.evtin.height;
                    }
                    if (cellvar.model.evtout.height == null) {
                        commandPort = 0;
                    } else {
                        commandPort = cellvar.model.evtout.height;
                    }

                    var flip = false,
                        mirror = false;
                    var style = cell.style;
                    var styleObject = styleToObject(style);
                    if (styleObject['stencilFlipV'] == null) {
                        flip = false;
                    } else {
                        if (styleObject['stencilFlipV'] == 0) {
                            flip = false;
                        } else {
                            flip = true;
                        }
                    }
                    if (styleObject['stencilFlipH'] == null) {
                        mirror = false;
                    } else {
                        if (styleObject['stencilFlipH'] == 0) {
                            mirror = false;
                        } else {
                            mirror = true;
                        }
                    }
                    style = objectToStyle(styleObject);
                    var geometry = cell.getGeometry();
                    text = 'Block Name : ' + cell.value.getAttribute('blockElementName') + "\n" +
                        'Simulation : ' + cell.value.getAttribute('simulationFunctionName') + "\n" +
                        'UID : ' + cell.id + "\n" +
                        'Style : ' + cell.style + "\n" +
                        'Flip : ' + flip + "\n" +
                        'Mirror : ' + mirror + "\n" +
                        'Input Ports : ' + inputPort + "\n" +
                        'Output Ports : ' + outputPort + "\n" +
                        'Control Ports : ' + controlPort + "\n" +
                        'Command Ports : ' + commandPort + "\n" +
                        'x : ' + geometry.x + "\n" +
                        'y : ' + geometry.y + "\n" +
                        'w : ' + geometry.width + "\n" +
                        'h : ' + geometry.height + "\n";
                }
            }
        }
        return text;
    };

    // Create XML tags!
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxCell-js.html
    // Uncomment this block to see XML tags work
    graph.convertValueToString = function(cell) {
        if (mxUtils.isNode(cell.value)) {
            var stylesheet = graph.getStylesheet();
            var attribute = cell.value.getAttribute('style');
            if (attribute == null) {
                attribute = cell.value.getAttribute('interfaceFunctionName');
            }
            var style = stylesheet.styles[attribute];
            var displayedLabel = style['displayedLabel'];
            if (displayedLabel != null) {
                // for setting label for affichm
                if (cell.value.getAttribute('style')!="AFFICH_m") {
                    var displayParameter = cell.blockInstance.instance.displayParameter;
                    if (displayParameter != null) {
                        for (var lbl of displayParameter) {
                            if (lbl == null)
                                lbl = "";
                            displayedLabel = displayedLabel.replace("%s", lbl.toString());
                        }
                    }
                } else {
                    var displayParameter = cell.value.getAttribute('style')+"-"+cell.id;
                    displayedLabel = displayedLabel.replace("%s", displayParameter.toString());
                }
                return displayedLabel;
            } else {
                return cell.getAttribute('label', '');
            }
        }
    };

    var cellLabelChanged = graph.cellLabelChanged;
    graph.cellLabelChanged = function(cell, newValue, autoSize) {
        if (mxUtils.isNode(cell.value)) {
            // Clones the value for correct undo/redo
            var elt = cell.value.cloneNode(true);
            elt.setAttribute('label', newValue);
            newValue = elt;
        }

        cellLabelChanged.apply(this, arguments);
    };

    // Enables new connections
    graph.setConnectable(true);

    // Adds all required styles to the graph (see below)
    configureStylesheet(graph);

    // Adds sidebar icons.
    addIcons(graph, sidebar);

    // Creates a new DIV that is used as a toolbar and adds toolbar buttons.
    var spacer = document.createElement('div');
    spacer.style.display = 'inline';
    spacer.style.padding = '8px';

    // Defines a new export action
    editor.addAction('toggle', function(editor, cell) {
        var toggle = document.getElementById("toggleBlocks");
        var button = document.getElementById("toggle");
        toggle.click();
        button.innerHTML = '';
        if (toggle.innerHTML == 'Expand All') {
            createButtonImage(button, 'images/navigate_plus.png');
        } else if (toggle.innerHTML == 'Collapse All') {
            createButtonImage(button, 'images/navigate_minus.png');
        }
        var titleName = document.createTextNode(toggle.innerHTML);
        button.appendChild(titleName);
    });

    /*
     * @jiteshjha, @pooja
     * rotateCustom(@parameters) is defined in 'orientation.js'
     */
    editor.addAction('rotateCustom', function(editor, cell) {
        rotateCustom(editor, graph, cell);
    });

    /*
     * @jiteshjha, @pooja
     * flipCustom(@parameters) is defined in 'orientation.js'
     */
    editor.addAction('flipCustom', function(editor, cell) {
        flipCustom(editor, graph, cell);
    });

    /*
     * @jiteshjha, @pooja
     * mirrorCustom(@parameters) is defined in 'orientation.js'
     */
    editor.addAction('mirrorCustom', function(editor, cell) {
        mirrorCustom(editor, graph, cell);
    });

    // @jiteshjha, @pooja
    /*
     * On selection and deletion of any block, 'deleteBlock'
     * function deletes all the associated edges with that block.
     * Used Preorder traversal for edges.
     */
    editor.addAction('deleteBlock', function(editor, cell) {
        graph.getModel().beginUpdate();
        try {
            // getEdgeId(@edgeObject) finds all the associated edges and
            // split-block, and deletes them
            function getEdgeId(edgeObject) {
                var cellStack = [];
                if (edgeObject != null && edgeObject.isEdge() == true) {
                    cellStack.push(edgeObject);
                    while (cellStack.length != 0) {
                        var tempEdgeObject = cellStack.pop();
                        if (tempEdgeObject.edge == true && (cells.indexOf(tempEdgeObject) == -1)) {
                            cells.push(tempEdgeObject);
                        }

                        // If the edge is associated with a
                        // split-block(source is a split-block)
                        if (tempEdgeObject.source.parent.name == "SPLIT_f") {
                            if (tempEdgeObject.source == tempEdgeObject.source.parent.getChildAt(1)) {
                                var sourceEdge = tempEdgeObject.source.parent.getChildAt(0).getEdgeAt(0);
                                var target = tempEdgeObject.source.parent.getChildAt(2).getEdgeAt(0).target;

                                // If the state of the edge is not null
                                if (graph.view.getState(sourceEdge) != null) {
                                    // Find waypoints for the first edge
                                    // related to split-block
                                    var waypoints1 = graph.view.getState(sourceEdge).absolutePoints;

                                    // Find the waypoints for the second
                                    // edge related to split-block
                                    var waypoints2 = graph.view.getState(tempEdgeObject.source.parent.getChildAt(2).getEdgeAt(0)).absolutePoints;
                                    waypoints2.shift();
                                    for (i in waypoints2) {
                                        waypoints1.push(waypoints2[i]);
                                    }
                                    var geometry = graph.getModel().getGeometry(sourceEdge);
                                    var cloneGeometry = geometry.clone();

                                    cloneGeometry.points = waypoints1;
                                    graph.getModel().setGeometry(sourceEdge, cloneGeometry);
                                    graph.refresh();

                                    // Shift the target for the first edge
                                    // related to splitBlock
                                    graph.getModel().setTerminal(sourceEdge, target, false);
                                }
                                cells.push(tempEdgeObject.source.parent);
                            } else {
                                var sourceEdge = tempEdgeObject.source.parent.getChildAt(0).getEdgeAt(0);
                                var target = tempEdgeObject.source.parent.getChildAt(1).getEdgeAt(0).target;

                                // If the state of the edge is not null
                                if (graph.view.getState(sourceEdge) != null) {
                                    // Find waypoints for the first edge
                                    // related to split-block
                                    var waypoints1 = graph.view.getState(sourceEdge).absolutePoints;

                                    // Find the waypoints for the second
                                    // edge related to split-block
                                    var waypoints2 = graph.view.getState(tempEdgeObject.source.parent.getChildAt(1).getEdgeAt(0)).absolutePoints;
                                    waypoints1.pop();
                                    waypoints2.shift();
                                    for (i in waypoints2) {
                                        waypoints1.push(waypoints2[i]);
                                    }
                                    var geometry = graph.getModel().getGeometry(sourceEdge);
                                    var cloneGeometry = geometry.clone();

                                    cloneGeometry.points = waypoints1;
                                    graph.getModel().setGeometry(sourceEdge, cloneGeometry);
                                    graph.refresh();

                                    // Shift the target for the first edge
                                    // related to splitBlock
                                    graph.getModel().setTerminal(sourceEdge, target, false);
                                }
                                cells.push(tempEdgeObject.source.parent);
                            }
                        }

                        // If the edge is associated with a
                        // split-block(target is a split-block)
                        if (tempEdgeObject.target.parent.name == "SPLIT_f") {
                            if (cells.indexOf(tempEdgeObject.target.parent) == -1) {
                                cells.push(tempEdgeObject.target.parent);
                            }
                            cellStack.push(tempEdgeObject.target.parent.getChildAt(1).getEdgeAt(0));
                            cellStack.push(tempEdgeObject.target.parent.getChildAt(2).getEdgeAt(0));
                        }
                    }
                }
            }

            var cells = [];

            // Get all selected cells
            var selectionCells = graph.getSelectionCells();

            // For each cell in the selection
            for (var k = 0; k < selectionCells.length; k++) {
                // If the cell is an edge, directly call
                // getEdgeId(@parameter) for deletion
                if (selectionCells[k].isEdge() == true) {
                    getEdgeId(selectionCells[k]);
                }

                // If the cell is a vertex, select the cell
                else {
                    var portCount = selectionCells[k].getChildCount();
                    /*
                     * Maverick, Adhitya
                     * switch-case statements to handle the ordering of
                     * following blocks.  The variables window.inBitMap and
                     * window.outBitMap are defined in the file
                     * 'dependencies.js'.
                     */
                    switch (selectionCells[k].value.nodeName) {
                        case 'ImplicitInBlock':
                        case 'ExplicitInBlock':
                            window.inBitMap = window.inBitMap.replaceAt(parseInt(selectionCells[k].value.getAttribute('ordering'))-1,'0') ;
                            break;
                        case 'ImplicitOutBlock':
                        case 'ExplicitOutBlock':
                            window.outBitMap = window.outBitMap.replaceAt(parseInt(selectionCells[k].value.getAttribute('ordering'))-1,'0') ;
                            break;
                    }
                    cells.push(selectionCells[k]);
                    for (var i = 0; i < portCount; i++) {
                        var edgeCount = selectionCells[k].getChildAt(i).getEdgeCount();
                        if (edgeCount != 0) {
                            /*
                             * For every edge associated with the current
                             * selected cell, call the
                             * getEdgeId(@parameter), parameter is an
                             * edgeObject for deletion
                             */

                            for (var j = 0; j < edgeCount; j++) {
                                var edgeObject = selectionCells[k].getChildAt(i).getEdgeAt(j);
                                getEdgeId(edgeObject);
                            }
                        }
                    }
                }
            }
            graph.removeCells(cells, true);
        } finally {
            graph.getModel().endUpdate();
        }
    });

    addToolbarButton(editor, toolbar, 'toggle', 'Expand All', 'images/navigate_plus.png');
    toolbar.appendChild(spacer.cloneNode(true));

    addToolbarButton(editor, toolbar, 'cut', 'Cut', 'images/cut.png');
    addToolbarButton(editor, toolbar, 'copy', 'Copy', 'images/copy.png');
    addToolbarButton(editor, toolbar, 'paste', 'Paste', 'images/paste.png');

    toolbar.appendChild(spacer.cloneNode(true));

    addToolbarButton(editor, toolbar, 'deleteBlock', 'Delete', 'images/delete2.png');
    addToolbarButton(editor, toolbar, 'undo', '', 'images/undo.png');
    addToolbarButton(editor, toolbar, 'redo', '', 'images/redo.png');
    toolbar.appendChild(spacer.cloneNode(true));

    // addToolbarButton(editor, toolbar, 'show', 'Show', 'images/camera.png');
    addToolbarButton(editor, toolbar, 'print', 'Print Xcos', 'images/printer.png');

    toolbar.appendChild(spacer.cloneNode(true));

    /*
     * Maverick
     * This method is used for loading the stylesheet from the file.
     * Reference: http://www.w3schools.com/xsl/xsl_client.asp
     */

    function loadXMLDoc(filename) {
        if (window.ActiveXObject) {
            xhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } else {
            xhttp = new XMLHttpRequest();
        }
        xhttp.open("GET", filename, false);
        try {
            xhttp.responseType = "msxml-document"
        } catch (err) {}
        xhttp.send("");
        return xhttp.responseXML;
    }

    /*
     * Maverick
     * The Export buttons in toolbar call this function with varying
     * arguments.
     * The third argument is used to decide which button is being pressed.
     * exportXML : 2 arguments
     * exportXcos: 3 arguments
     */
    function displayXMLorXcos() {
        var textarea = document.createElement('textarea');
        textarea.style.width = '400px';
        textarea.style.height = '400px';

        var enc = new mxCodec(mxUtils.createXmlDocument());

        var node = enc.encode(diagRoot);

        var str = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + mxUtils.getPrettyXml(node);

        textarea.value = str;

        xmlCode = str; // taking the xmlCode

        if (arguments[2] == null) {
            showModalWindow(graph, 'XML', textarea, 410, 440);
        } else {
            return mxUtils.getPrettyXml(node);
        }
    }

    function getXcosDiagram(editor, cell) {
        // Mind the 3 parameters.
        var xmlFromExportXML = displayXMLorXcos(editor, cell, true);
        if (xmlFromExportXML === null)
            alert('First create the XML file.');
        else {
            var xml = mxUtils.parseXml(xmlFromExportXML);

            var xsl = loadXMLDoc("finalmodsheet.xsl");

            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            resultDocument = xsltProcessor.transformToDocument(xml);
            /*
             * Maverick
             * Using resultDocument.documentElement to remove an additional
             * tag "<#document>" created by the XSLTProcessor.
             */
            var str = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" + mxUtils.getPrettyXml(resultDocument.documentElement);

            str = str.replace(/\n\n/g, "\n");
            return str;
        }
    }

    // Defines a new export action

    function EXPORTxml(editor,cell)
    {
        displayXMLorXcos(editor, cell);
    }

    editor.addAction('exportXML', function(editor,cell) { EXPORTxml(editor, cell) });

    /* Maverick
     * Reference: http://www.w3schools.com/xsl/xsl_client.asp
     */

    editor.addAction('exportXcos', function(editor, cell) {
        if (graph.getChildVertices(graph.getDefaultParent()).length == 0) {
            alert("Empty canvas! Nothing to export!");
            return false;
        }
        var div = document.createElement('div');
        div.style.margin = "auto";

        var fileInputField = document.createElement("input");
        fileInputField.type = "text";
        fileInputField.placeholder = "Filename";
        fileInputField.style = "margin:30px 3px 20px 55px;";
        fileInputField.id = "ExportFilenameInput";
        fileInputField.maxlength = "128";
        fileInputField.autofocus = true;
        fileInputField.onkeydown = function(event) {
            if (event.which == 13) {
                // This simulates click on download link if enter key is
                // pressed while entering filename
                document.getElementById("downloadLinkForExportXcos").click();
            }
        };

        var textNodeXcos = document.createElement("span");
        textNodeXcos.innerHTML = ".xcos";
        textNodeXcos.style = "margin:30px 0px 40px 0px;";

        var downloadLink = document.createElement('a');

        downloadLink.id = "downloadLinkForExportXcos";
        downloadLink.href = "data:application/x-scilab-xcos;charset=ascii," + encodeURIComponent(getXcosDiagram(editor, cell));
        downloadLink.innerHTML = "Save as Xcos File";
        downloadLink.style = "text-decoration: none;padding: 2px 6px 2px 6px;border-top: 4px solid rgb(212, 209, 209);border-right: 4px solid #656464;border-bottom: 4px solid #656464;border-left: 4px solid rgb(212, 209, 209);box-sizing:border-box;border-radius:2px;margin:0px 80px 30px 80px;white-space: nowrap;";
        downloadLink.onclick = function() {
            var exportFilename = document.getElementById("ExportFilenameInput").value;
            if (exportFilename === "") {
                alert("Enter filename!");
                return false;
            }
            else {
                // This RegExp is for a valid filename
                var checkpat = new RegExp("^[^<>:\"/\|\\?*]+$");

                if (checkpat.test(exportFilename)) {
                    // This branch will execute if filename is valid
                    downloadLink.download = exportFilename + ".xcos";
                    wind.destroy();
                    return true;
                }
                else {
                    // This branch will execute if filename is invalid
                    alert("Insert valid filename! < > : \" / \| \\ ? * not allowed in filename!");
                    return false;
                }
            }
        };

        var breakNode1 = document.createElement('br');
        var breakNode2 = document.createElement('br');
        var breakNode3 = document.createElement('br');
        var breakNode4 = document.createElement('br');
        var breakNode5 = document.createElement('br');
        var breakNode6 = document.createElement('br');

        div.appendChild(breakNode1);
        div.appendChild(fileInputField);
        div.appendChild(textNodeXcos);
        div.appendChild(breakNode2);
        div.appendChild(breakNode3);
        div.appendChild(downloadLink);
        div.appendChild(breakNode4);
        div.appendChild(breakNode5);
        div.appendChild(breakNode6);

        var wind = showModalWindow(graph, 'Export Xcos', div, 264, 150);
    });

    // function which takes the xml code and changes it to the diagram
    function xcosToDiagram(xmlDocument) {
        /*
         * Maverick
         * A dictionary is used to perform the mapping between the old ids
         * and the new ids.  See explanation at the beginning of the
         * function!!!
         */
        var nodeDataObject = {};

        graph.model.beginUpdate();
        try {
            var parent = graph.getDefaultParent();
            var doc = mxUtils.parseXml(xmlDocument);

            var codec = new mxCodec(doc);
            var rootNode = doc.documentElement;
            /*
             * Maverick
             * Extracting 'Setup Window' values from Xcos diagram and
             * setting the same on the new diagram.
             */
            var defaultProperties = setup("get");
            var propertiesObject = {};

            for (var key in defaultProperties) {
                if (defaultProperties.hasOwnProperty(key)) {
                    propertiesObject[defaultProperties[key][1]] = rootNode.getAttribute(defaultProperties[key][1]);
                    /*
                     * Maverick
                     * Adding the corresponding attributes to the <XcosDiagram>
                     * tag.
                     */
                    diagRoot[defaultProperties[key][1]] = rootNode.getAttribute(defaultProperties[key][1]);
                }
            }
            setup("set", propertiesObject);

            while (rootNode.nodeName != 'root') {
                /*
                 * Maverick
                 * Extracting 'Set Context' values from Xcos diagram
                 * and setting the same on the new diagram.
                 */
                if (rootNode.nodeName == 'Array') {
                    var contextValues = [];

                    var contextChild = rootNode.firstChild;

                    while (contextChild != null) {
                        contextValues.push(contextChild.getAttribute('value'));
                        contextChild = contextChild.nextSibling;
                    }

                    diagRoot.context = contextValues;
                    diagRoot.context.scilabClass = "String[]";
                    handleContext("set", contextValues);
                    rootNode = rootNode.nextSibling;
                } else if (rootNode.nodeName == '#comment') {
                    rootNode = rootNode.nextSibling;
                } else {
                    rootNode = rootNode.firstChild;
                }
            }

            var cells = [];
            for (var currentNode = rootNode.firstChild;
                currentNode != null;
                currentNode = currentNode.nextSibling) {
                var curNodeName = currentNode.nodeName;

                if (curNodeName == 'mxCell') {
                    /* mxCell nodes are not parsed */
                    continue;
                }

                if (curNodeName.endsWith('Link')) {
                    /* Link nodes are parsed later */
                    continue;
                }

                /* parse only Block and Port nodes now */

                var cell = codec.decode(currentNode);

                if (cell.style)
                {
                    if (cell.style.startsWith("scifunc_block_m")) {
                        alert("Double click on scifunc_block_m to choose .sci file and set parameters");
                    }
                }

                var curId = currentNode.getAttribute('id');

                /*
                 * Maverick
                 * Finding the mxGeometry node for all the nodes.
                 */
                var geometryCell = null;
                for (var geometryNode = currentNode.firstChild;
                    geometryNode != null;
                    geometryNode = geometryNode.nextSibling) {
                    if (geometryNode.nodeName == 'mxGeometry') {
                        geometryCell = codec.decode(geometryNode);
                        break;
                    }
                }
                /*
                 * Maverick
                 * Adding the blocks.
                 * Finding out the constructor names for all the blocks
                 * which are not a port or a link.  Ports will be
                 * automatically handled with the respective
                 * constructor calls.
                 */
                if (!(curNodeName.endsWith('Link') || curNodeName.endsWith('Port'))) {
                    var ifaceFuncName = null;
                    /*
                     * Maverick
                     * The following data structure is used to store
                     * the information required for each block to the
                     * subsequent mapping.
                     */
                    var temporaryMapObject = new Object();
                    temporaryMapObject.inputDataArray = [];

                    switch(curNodeName) {
                        case 'EventInBlock': ifaceFuncName='CLKINV_f'; break;
                        case 'EventOutBlock': ifaceFuncName='CLKOUTV_f'; break;
                        case 'ExplicitInBlock': ifaceFuncName='IN_f'; break;
                        case 'ExplicitOutBlock': ifaceFuncName='OUT_f'; break;
                        case 'ImplicitInBlock': ifaceFuncName='INIMPL_f'; break;
                        case 'ImplicitOutBlock': ifaceFuncName='OUTIMPL_f'; break;
                        case 'RoundBlock':
                            ifaceFuncName=cell.interfaceFunctionName;
                            if (ifaceFuncName == null)
                                ifaceFuncName='CLKSOMV_f';
                            break;
                        case 'SuperBlock': ifaceFuncName='SUPER_f'; break;
                        case 'TextBlock': ifaceFuncName='TEXT_f'; break;
                        default: ifaceFuncName=cell.interfaceFunctionName;
                    }

                    var details_instance=null
                    if (ifaceFuncName != null) {
                        details_instance = new window[ifaceFuncName]();
                        //create_filebrowser();
                    }

                    if (details_instance != null) {
                        var details = importBlock(currentNode, cell, details_instance);

                        var enc = new mxCodec(mxUtils.createXmlDocument());
                        var node = enc.encode(details);
                        var temp = enc.encode(parent);
                        var stylesheet = graph.getStylesheet();
                        var styleName = currentNode.getAttribute('style');
                        var fullStyleName = styleName;
                        if (styleName!=null) {
                            var idx = styleName.indexOf(';');
                            if (idx != -1) {
                                styleName = styleName.substring(0, idx);
                            }
                        }
                        var style = stylesheet.styles[styleName];
                        var angle = currentNode.getAttribute('angle');
                        var imageStyle = "";
                        if (angle != null) {
                            imageStyle = ' style="transform:rotate(' + angle + 'deg)"';
                        }

                        var height = 80;
                        var width = 80;
                        if (geometryCell.height != null)
                            height = geometryCell.height;
                        if (geometryCell.width != null)
                            width = geometryCell.width;

                        /*
                         * When a particular block is loaded for the
                         * first time, the image in the style of the
                         * block will be a path to the image.  Set the
                         * label in the style property of the block has
                         * a html image, and set the image in the style
                         * property as null
                         *
                         * NOTE: Since the image of any block need not
                         * be changed for for every movement of that
                         * block, the image must be set only once.
                         */
                        if (style != null && style['image'] != null) {
                            // Make label as a image html element
                            var label = '<img src="' + style['image'] + '" height="' + (height*0.9) + '" width="' + (width*0.9) + '">';

                            // Set label
                            style['label'] = label;
                            style['imagePath'] = style['image'];
                            // Set image as null
                            style['image'] = null;

                            // Add the label as a part of node
                            node.setAttribute('label', label);
                        }

                        /*
                         * If a particular block with image tag in it's
                         * style property has been invoked already, the
                         * image tag would be null for any successive
                         * instances of the same block. Hence, set the
                         * label from the label tag in style which was
                         * set when that blockModel was invoked on the
                         * first time.
                         */
                        if (style != null && style['label'] != null) {
                            // Set label from the label field in the style
                            // property
                            node.setAttribute('label', style['label']);
                        }
                        node.setAttribute('parent', temp.getAttribute('id'));

                        var v1 = graph.insertVertex(graph.getDefaultParent(), null, node, geometryCell.x, geometryCell.y, width, height, fullStyleName);
                        // @Chhavi: Additional attribute to store the
                        // block's instance
                        v1.blockInstance = createInstanceTag(details_instance);
                        temporaryMapObject.newId = v1.id;

                        nodeDataObject[curId] = temporaryMapObject;
                        // To get affich Id for label
                        if (ifaceFuncName == "AFFICH_m") {
                            details_instance.setLabel(ifaceFuncName+"-"+temporaryMapObject.newId);
                            var affich_details = importBlock(currentNode, cell, details_instance);
                        }

                        // findAndCreatePorts(graph,v1,doc,curId,codec);
                        // createPorts(graph, v1, inputPorts, controlPorts, outputPorts, commandPorts);

                        v1.setConnectable(false);
                    }

                    /*
                     * Maverick
                     * Handling SplitBlock in a different manner.
                     */
                    if (curNodeName == 'SplitBlock') {
                        // (-2, -2) is the offset to correct the position of
                        // split-block
                        var v1 = graph.insertVertex(graph.getDefaultParent(), null, '', geometryCell.x - 2, geometryCell.y - 2, geometryCell.width, geometryCell.height, 'Split', false);
                        temporaryMapObject.newId = v1.id;
                        nodeDataObject[curId] = temporaryMapObject;
                        v1.setConnectable(false);
                    }
                } else if (curNodeName.endsWith('Port')) {
                    var oldParentId = currentNode.getAttribute('parent');
                    var ordering = currentNode.getAttribute('ordering');
                    var style = currentNode.getAttribute('style');
                    var newParentObj = nodeDataObject[oldParentId];

                    var curNodeData = { nodeName: curNodeName, ordering: ordering, style: style, id: curId, geometryCell: geometryCell }
                    newParentObj.inputDataArray.push(curNodeData);
                }
            }

            /*
             * Maverick
             * Adding the ports.
             */
            for (var currentNode = rootNode.firstChild;
                currentNode != null;
                currentNode = currentNode.nextSibling) {
                var curNodeName = currentNode.nodeName;
                if (curNodeName == 'mxCell' || curNodeName.endsWith('Port') || curNodeName.endsWith('Link')) {
                    continue;
                }

                /*
                 * Maverick
                 * Handling all the ports of a given block collectively.
                 */
                var curId = currentNode.getAttribute('id');
                var newParentObj = nodeDataObject[curId];
                if (newParentObj != null) {
                    var newParentId = newParentObj.newId;

                    var newParentCell = graph.getModel().getCell(newParentId);
                    createPortsWithGeometry(graph, newParentCell, newParentObj.inputDataArray, nodeDataObject);
                }
            }

            /*
             * Maverick
             * Connecting the links.
             */

            for (var currentNode = rootNode.firstChild;
                currentNode != null;
                currentNode = currentNode.nextSibling) {
                var curNodeName = currentNode.nodeName;
                if (!curNodeName.endsWith('Link')) {
                    continue;
                }

                var pointsArray = [];
                var newSourceObj = nodeDataObject[currentNode.getAttribute('source')];
                var newTargetObj = nodeDataObject[currentNode.getAttribute('target')];

                var newSourceCell = graph.getModel().getCell(newSourceObj.newId);
                var newTargetCell = graph.getModel().getCell(newTargetObj.newId);

                var childNode = currentNode.firstChild;
                if (childNode != null && childNode.nodeName == 'mxGeometry') {
                    for (var tempNode = childNode.firstChild;
                            tempNode != null;
                            tempNode = tempNode.nextSibling) {
                        if (tempNode.nodeName != 'Array')
                            continue;
                        for (var mxPointNode = tempNode.firstChild;
                            mxPointNode != null;
                            mxPointNode = mxPointNode.nextSibling) {
                            if (mxPointNode.nodeName == 'mxPoint') {
                                pointsArray.push(new mxPoint(mxPointNode.getAttribute('x'), mxPointNode.getAttribute('y')));
                            }
                        }
                    }
                }

                createEdgeObject(graph, newSourceCell, newTargetCell, pointsArray);
            }
        } finally {
            graph.model.endUpdate();
        }
    }

    function load_example_content(xmlDocument, filename) {
        if (/&lt;XcosDiagram .*&gt;.*&lt;\/XcosDiagram&gt;/.test(xmlDocument)) {
            var parser = new DOMParser();
            xmlDocument = '<!doctype html><body>' + xmlDocument + '</body>';
            var dom = parser.parseFromString(xmlDocument, 'text/html');
            xmlDocument = dom.body.textContent;
            filename = '<!doctype html><body>' + filename + '</body>';
            var dom2 = parser.parseFromString(filename, 'text/html');
            filename = dom2.body.textContent;
        }
        if (/<XcosDiagram .*>.*<\/XcosDiagram>/.test(xmlDocument)) {
            xcosToDiagram(xmlDocument);
            document.title = 'Xcos Example ' + filename;
        }
    }

    /*
     * Maverick
     * Adding a new button to import an Xcos diagram to our GUI and perform
     * the simulation on the remote server.
     * The flow of control is as follows:
     * The entire XML document is traversed, beginning from the root node.
     * The document is traversed three times:
     * 1. All the blocks are appended on the graph.
     * 2. All the ports are added to the blocks.
     * 3. All the links are made.

     * Old ids are the ones which can be found from the imported file but
     * when the blocks are added to the graph mxGraph assigns new ids to
     * them.  Careful mapping needs to be done between these two ids.
     */

    // function which makes importing the xcos file
    function IMPORTxcos(editor,cell) {
        var xmlDocument = '';
        var div = document.createElement('div');
        var node = document.createElement('form');
        div.setAttribute("id", "tempdiv");
        div.setAttribute("style", "height:100;width:100");

        var fileNode = document.createElement('input');
        fileNode.type = 'file';
        fileNode.accept = '.xcos'
        fileNode.style = "margin:30px 30px 40px 30px;";
        if (!(window.File && window.FileReader && window.Blob && window.FileList)) {
            alert('This browser doesn\'t support this feature.');
            return;
        }
        node.id = "tempform";
        node.appendChild(fileNode);
        var button = document.createElement('button');
        button.innerHTML = 'Submit';
        button.type = "button";
        button.name = "submit";
        button.style = "margin:0px 113px 30px 113px;";

        var breakNode1 = document.createElement('br');
        var breakNode2 = document.createElement('br');

        node.appendChild(button);
        node.appendChild(breakNode1);
        node.appendChild(breakNode2);

        fileNode.addEventListener('change', function(evt) {
            var f = evt.target.files[0];

            // Checks if file extension is "xcos" or not
            if (!f.name.endsWith(".xcos")) {
                alert("Choose proper file! Only xcos files can be uploaded!");
                // This will reset the file type input
                this.value = null;
                // This will prevent any further actions if can occur
                return false;
            }

            var r = new FileReader();

            r.onload = function(e) {
                var contents = e.target.result;
                /*
                 * Maverick
                 * The following regular expressions are used to format the
                 * imported Xcos XML according to the format that is
                 * recognized by the mxCodec decoder.
                 */
                xmlDocument = contents;

                // RegEx to replace all the newline characters.
                xmlDocument = xmlDocument.replace(/\n*/, '');
                // RegEx to replace all the space characters between any a
                // closing and the next opening tag.
                xmlDocument = xmlDocument.replace(/>\s*</g, '><');

                // RegEx to replace all the XML comments.
                xmlDocument = xmlDocument.replace(/<!--[\s\S]*?-->/g, '');

                // textArea.value = xmlDocument;
            }

            r.readAsText(f);
        }, false);

        button.onclick = function() {
            if (!checkImport(xmlDocument))
                return false;
            xcosToDiagram(xmlDocument);
        }

        function checkImport(xmlDocument) {
            if (xmlDocument == "") {
                alert("Enter filename!");
                return false;
            }

            if (graph.getChildVertices(graph.getDefaultParent()).length != 0) {
                // This branch will execute if there are no elements
                // present in the canvas
                graph.model.beginUpdate();
                try {
                    var confirmValue = confirm("Importing this file will remove the existing diagram. Are you sure you want to continue?");
                    if (!confirmValue) {
                        return false;
                    }
                    // Close simulation windows of earlier diagram for
                    // graph and affich if exist

                    if (typeof wnd !== 'undefined' && typeof affichwnd !== 'undefined' ) {
                        wnd.destroy(); // simulation window
                        affichwnd.destroy(); // affichm window
                    }
                    // stop scilab for earlier execution is not stopped
                    stopSimulation();
                    StopTK();
                    graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));
                } finally {
                    graph.model.endUpdate();
                }
            }

            wind.destroy();
            return true;
        }

        div.appendChild(node);

        node.style.visibility = "visible";
        var wind = showModalWindow(graph, 'Set Context', div, 268, 162);
    }
    editor.addAction('importXcos', importxcos = function(editor, cell) {
        IMPORTxcos(editor, cell);
    });
    // Stop simulation inbetween process
    function stopSimulation() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/stop?id="+clientID, true);
        chart_reset();
        xhr.send();
    }
    // Button for stop
    editor.addAction('processStop', function(editor, cell) {
        stopSimulation();
        StopTK();
    });

    addToolbarButton(editor, toolbar, 'importXcos', 'Import Xcos', 'images/export1.png');
    // addToolbarButton(editor, toolbar, 'exportXML', 'Export XML', 'images/export1.png');
    addToolbarButton(editor, toolbar, 'exportXcos', 'Export Xcos', 'images/export1.png');
    toolbar.appendChild(spacer.cloneNode(true));

    addToolbarButton(editor, toolbar, 'simulate', 'Simulate', 'images/ScilabExecute.png');
    addToolbarButton(editor, toolbar, 'processStop', ' Stop', 'images/process-stop.png');

    editor.addAction('simulate', function(editor, cell) {
        // when user leaves the page, the process will be stopped
        window.onunload = function(e) {
            StopTK();
        }
        var diagram = getXcosDiagram(editor, cell);
        var blob = new Blob([diagram], {
            type: 'text/plain'
        });

        // Create mxWindow for charts
        var win = '<div id="charts" style="text-align: center;"><img id="loader" style="position: absolute; top:50%; transform: translate(-50%, -50%);" src="images/loading.gif"/></div>';
        var content = document.createElement('div');
        content.style.padding="1%";
        content.innerHTML = win;
        // Center the mxWindow
        var w = document.body.clientWidth;
        var h = (document.body.clientHeight || document.documentElement.clientHeight);

        wnd = new mxWindow('Simulation', content, (w-600)/2, (h-400)/2, 600, 400, true, true);
        wnd.setMaximizable(true);
        wnd.setMinimizable(true);
        wnd.setScrollable(true);
        wnd.setResizable(true);
        wnd.setClosable(true);
        // wnd.setVisible(true);
        wnd.addListener(mxEvent.CLOSE, function(e) {
            chart_reset();
            StopTK();
        });

        // Create mxWindow for affich
        var affichwin = '<div id="affich_div"><div id="img_loader" align="center" style="height:30px;"><img  src="images/loading.gif"/></div></div>';
        var affichcontent = document.createElement('div');
        affichcontent.style.padding="1%";
        affichcontent.innerHTML = affichwin;
        // Center the mxWindow
        var affichw = document.body.clientWidth;
        var affichh = (document.body.clientHeight || document.documentElement.clientHeight);

        affichwnd = new mxWindow('Affich_m Values', affichcontent, (affichw-800)/2, (affichh-400)/2, 300, 500, true, true);
        affichwnd.setMaximizable(true);
        affichwnd.setMinimizable(true);
        affichwnd.setScrollable(true);
        affichwnd.setResizable(true);
        affichwnd.setClosable(true);

        affichwnd.addListener(mxEvent.CLOSE, function(e) {
            StopTK();
        });

        //  starting

        var parser,xmlDoc;
        parser = new DOMParser();
        // converts string to xmlcode ( in xmlDoc )
        xmlDoc = parser.parseFromString(xmlCode,"text/xml");

        var valArr = new Array();  // stores 'tkscale' parameters in an array
        var tkarr = new Array();
        var sliderArr = new Array();

        // variables to store the values
        var row = 0, min, max, norm, num = 1, cscount = 0;
        // get all 'BasicBlock' tags from xml code
        var Bblock_tag = xmlDoc.getElementsByTagName("BasicBlock");
        // get all 'AfficheBlock' tags from xml code
        var Ablock_tag = xmlDoc.getElementsByTagName("AfficheBlock");
        // get all 'mxCell' tags from xml code
        var mx_tag = xmlDoc.getElementsByTagName("mxCell");
        // array which stores the main id of each tkblock
        var tkid  = new Array();
        var affichmid  = new Array();
        var clkid = new Array();    // array which stores every CLOCK_c ids
        // array which stores the parameters of clock ('Period',
        // 'initialisation time')
        var clkdetails = new Array();
        // array which stores the port ids of every tk block ('control
        // port', 'explicit port')
        var tkarr = new Array();
        // array which stores the 'child' id's of each split
        var sparr = new Array();
        // some variables to use as array indices
        var j=1, k=0, l=0, m=0, n=0, o=0, p=0, y=0, count=1;
        var with_interval = false;
        var with_interval2 = false;

        // loop which iterates every 'BasicBlock' tag and take the required
        // details
        if (Bblock_tag.length == 0)  // if threre is no any single BasicBlock
        {
            alert("Empty Canvas");  //  it implies Empty Canvas
            wnd.destroy();  // destroy the simulation window
        }

        for (var i=0;i<Bblock_tag.length;i++)
        {
            // if block is Trash_f
            /* if (Bblock_tag[i].attributes.blockElementName.value == "TRASH_f")
             * {
             * wnd.setVisible(false);
             * }
             */
            var req_block = new Array();
            var names = new Array();
            names[i] = Bblock_tag[i].attributes.blockElementName.value;

            // Condition to show wnd ie set visible in case
            if (names.includes("BARXY") ||
                names.includes("CANIMXY") ||
                names.includes("CANIMXY3D") ||
                names.includes("CEVENTSCOPE") ||
                names.includes("CFSCOPE") ||
                names.includes("CLKOUTV_f") ||
                names.includes("CMAT3D") ||
                names.includes("CMATVIEW") ||
                names.includes("CMSCOPE") ||
                names.includes("CSCOPE") ||
                names.includes("CSCOPXY") ||
                names.includes("CSCOPXY3D") ||
                names.includes("OUTIMPL_f") ||
                names.includes("OUT_f")) {
                wnd.setVisible(true);
            }

            /* start interval functions only if required */
            var blockname = Bblock_tag[i].attributes.blockElementName.value;
            switch (blockname) {
                case "CANIMXY":     /* block id= 9 */
                case "CANIMXY3D":   /* block id=10 */
                case "CEVENTSCOPE": /* block id=23 */
                case "CFSCOPE":     /* block id= 3 */
                case "CMSCOPE":     /* block id= 2 */
                case "CSCOPE":      /* block id= 1 */
                case "CSCOPXY":     /* block id= 4 */
                case "CSCOPXY3D":   /* block id= 5 */
                    with_interval = true;
                    break;

                case "BARXY":       /* block id=11 */
                    with_interval2 = true;
                    break;
            }

            if (names.includes("scifunc_block_m")) {
                req_block.push("scifunc_block_m");
                var flag1 = true;
            }
            if (names.includes("CSCOPE")) {
                req_block.push("CSCOPE");
                var flag2 = true;
            }

            // if block is TKSCALE
            if (Bblock_tag[i].attributes.blockElementName.value == "TKSCALE")
            {
                // a.store tk ids
                tkid[m++] = parseInt(Bblock_tag[i].attributes.id.value);

                // b. under scilab double tag in real parameters attributes
                // take the min,max,norm values
                var Sdouble_tag=Bblock_tag[i].getElementsByTagName("ScilabDouble");
                var Realpart_tag=Sdouble_tag[0].getElementsByTagName("data");

                if (row>10)
                {
                    // limit - only (maximum) 10 TKSCALE should use in an
                    // experiment
                    alert("maximum \"10\" TKSCALE blocks are allowed");
                    wnd.destroy();
                    break;
                }
                valArr[row]=new Array();
                // min value
                valArr[row][0] = parseInt(Realpart_tag[0].attributes.realPart.value);
                // max value
                valArr[row][1] = parseFloat(Realpart_tag[1].attributes.realPart.value);
                // norm value
                valArr[row][2] = parseFloat(Realpart_tag[2].attributes.realPart.value);
                row++;
            } // here is ValArr they are storing all the values of tkscale
            // finding total cscopes used
            if (Bblock_tag[i].attributes.blockElementName.value == "CSCOPE")
                cscount++;

            if (Bblock_tag[i].attributes.blockElementName.value == "CLOCK_c")
            {
                clkid[n++]= parseInt(Bblock_tag[i].attributes.id.value);

                // in clock_c tag under 'scilab string' with 'exprs'
                // attribute store its parameters
                var Sstr = Bblock_tag[i].getElementsByTagName("ScilabString");
                for (var x=0;x<Sstr.length;x++)
                {
                    if (Sstr[x].getAttribute('as')!=null)
                    {
                        if (Sstr[x].attributes.as.value == "exprs")
                        {
                            var data_tag = Sstr[x].getElementsByTagName("data");

                            // finding there are exactly two parameters
                            if (data_tag.length == 2)
                            {
                                // parameters stored in array only 'once'
                                if (count % 2)
                                {
                                    clkdetails[y] = new Array();
                                    // 'Period' parameter
                                    clkdetails[y][0] = data_tag[0].attributes.value.value;
                                    // 'Initialisation time' parameter
                                    clkdetails[y][1] = data_tag[1].attributes.value.value;
                                    y++;
                                }
                                count++;
                            }
                        }
                    }
                }
            }
        }

        // To loop to get id of block AFFICH from array of Ablock_Tag
        for (var i=0;i<Ablock_tag.length;i++)
        {
            // if block is AFFICH_m
            if (Ablock_tag[i].attributes.blockElementName.value == "AFFICH_m")
            {
                /*
                 * affichmid : is used to store ids of affichm block which
                 * will be used for creating div for display result
                 */
                affichmid[m++] = parseInt(Ablock_tag[i].attributes.id.value);
            }
        }
        // To check if affichmid array is empty or not and create div with
        // ID with name append with block ID
        if (affichmid.length!=0) {
            // to make affich mxwindow visible only if affich block exist
            affichwnd.setVisible(true);
            for (var i=0;i<affichmid.length;i++) {
                // create div for displaying result of affichm blocks
                $('#affich_div').append("<div id='affichdata-"+affichmid[i]+"' style='padding-bottom: 20px;'></div>");
            }
        }

        // finding splits from every link, TKSCALE parameter values

        if (row<=10 && row >= 1) {
            while (j<mx_tag.length)
            {
                if (parseInt(mx_tag[j].attributes.parent.value) == tkid[o])
                {
                    tkarr[l]=new Array();
                    tkarr[l][0]=parseInt(mx_tag[j].attributes.id.value);
                    j++;
                    tkarr[l][1]=parseInt(mx_tag[j].attributes.id.value);
                    j++;

                    l=l+1;
                    o++;
                }

                if (parseInt(mx_tag[j].attributes.parent.value) == clkid[p])
                {
                    // clock parameter 'command port'
                    clkid[p]=parseInt(mx_tag[j].attributes.id.value);
                    p++;
                }
                if (mx_tag[j].getAttribute('style') !=null)
                {
                    // store the split details
                    if (mx_tag[j].attributes.style.value == "Split")
                    {
                        j=j+1;
                        sparr[k]= new Array();
                        // 2-D array, 1st column split id value, 2nd column
                        // indicates to which group split belongs to
                        sparr[k][0]=parseInt(mx_tag[j].attributes.id.value);
                        // -1 indicates split does not grouped with any other
                        // group
                        sparr[k][1]=-1;
                        k=k+1;
                    }
                }
                j++;
            }

            j=1;

            // index of present source,target in split array sparr
            var sind, tind;
            var grouparr= new Array(); // get the details of different  groups
            // get the details like clock stored in particular group
            var clkgrp = new Array();
            // get the details like tk stored in particular group
            var tkgrp = new Array();
            var groupind=0; // index used for group

            for (var i=0;i<clkid.length;i++)
                clkgrp[i]=-1;       // initialising clkarr to -1

            for (var i=0;i<tkarr.length;i++)
                tkgrp[i]=-1;    // initialising tkgrp to -1

            // using the splits and their connections we will find the
            // connection between tkscale and clock
            while (j<mx_tag.length)
            {
                sind=-1;
                tind=-1;
                if (mx_tag[j].getAttribute("source")!=null)
                {
                    // present source
                    var s = parseInt(mx_tag[j].attributes.source.value);
                    // present target
                    var t = parseInt(mx_tag[j].attributes.target.value);

                    // note that split has 3 childs with consecutive ids
                    // (ex: 80,81,82)... we stored the first index (80 in
                    // ex.) in the array
                    for (var i=0;i<k;i++)
                    {
                        // find source (index value of split) if it belongs
                        // to one of the splits childs (80<=s<=82 ex.)
                        if ((sparr[i][0]<=s)&&(s<=sparr[i][0]+2))
                            sind=i;
                        // find targets (index value of split) if it
                        // belongs to one of the splits childs (80<=t<=82
                        // ex.)
                        if ((sparr[i][0]<=t)&&(t<=sparr[i][0]+2))
                            tind=i;
                    }
                    // if both source and target belongs to splits...
                    if (sind!=-1 && tind!=-1)
                    {
                        // if both are not grouped to any other split
                        if (sparr[sind][1]==-1 && sparr[tind][1]==-1)
                        {
                            grouparr[groupind] = new Array();
                            // create a new group in grouparr and push the
                            // two indices (of sparr)
                            grouparr[groupind].push(sind,tind);
                            // indicating that this source split belongs to
                            // grouparr i.e., it is grouped at groupind
                            // (grouparr index value)
                            sparr[sind][1]=groupind;
                            // indicating that this target split belongs to
                            // grouparr i.e., it is grouped at groupind
                            // (grouparr index value)
                            sparr[tind][1]=groupind;

                            groupind++;
                        }
                        // if source is not grouped and target is grouped
                        // to another split
                        else if ((sparr[sind][1]==-1 && sparr[tind][1]!=-1))
                        {
                            // add source split to the grouparr (group
                            // where target belongs to)
                            grouparr[sparr[tind][1]].push(sind);
                            // change the group value of the split
                            sparr[sind][1]=sparr[tind][1];
                        }
                        // if target is not grouped and source is grouped
                        // to another split
                        else if ((sparr[sind][1]!=-1 && sparr[tind][1]==-1))
                        {
                            // add target split to the grouparr (group
                            // where source belongs to)
                            grouparr[sparr[sind][1]].push(tind);
                            // change the group value of the split
                            sparr[tind][1]=sparr[sind][1];
                        }
                        // if source,target both are grouped with some
                        // other splits
                        else
                        {
                            // here we will find the minimum group index
                            // value and merge the maximum group into
                            // minimum.  ex: group indices- 2,4.. then take
                            // all splits in 4(max) index and add them to
                            // the 2(min) index

                            // find the minimum index of source_grouped
                            // index,target_grouped index
                            var min=(sparr[sind][1]>sparr[tind][1])?sparr[tind][1]:sparr[sind][1];
                            // find the maximum index of source_grouped
                            // index,target_grouped index
                            var max=(sparr[sind][1]>sparr[tind][1])?sparr[sind][1]:sparr[tind][1];

                            // iterating to every split in maximum group
                            for (var x=0;x<grouparr[max].length;x++)
                            {
                                // getting the split id
                                var val = grouparr[max][0];
                                // making their group id with minimum index
                                // value.
                                sparr[val][1] = min;
                            }
                            // concatenate all splits in max to min.
                            grouparr[min] = grouparr[min].concat(grouparr[max]);
                            sparr[tind][1] = min;    // changing the group id
                            sparr[sind][1] = min;    // changing the group id
                        }
                    }
                    // if source  does not belongs to splits then it
                    // belongs to one of the clock id's
                    if (sind==-1 && tind!=-1)
                    {
                        for (var i=0;i<p;i++)
                            if (s==clkid[i])
                                break;
                        if (i!=p)
                            sind = i;
                        if (sind!=-1)
                        {
                            clkgrp[i]=t; // adding the target in the clkgroup
                            if (sparr[sind][1]==-1)
                            {
                                grouparr[groupind] = new Array();
                                grouparr[groupind].push(sind);
                                sparr[sind][1]=groupind;
                                groupind++;
                            }
                        }
                    }
                    // if target  does not belongs to splits then it
                    // belongs to one of the tkscale id's
                    if (tind==-1 && sind!=-1)
                    {
                        for (var i=0;i<l;i++)
                            if (t==tkarr[i][0])
                                break;
                        if (i!=l)
                            tind = i;
                        if (tind!=-1)
                        {
                            tkgrp[i] = s;

                            if (sparr[tind][1]==-1)
                            {
                                grouparr[groupind] = new Array();
                                grouparr[groupind].push(tind);
                                sparr[tind][1]=groupind;
                                groupind++;
                            }
                        }
                    }
                }
                j=j+1;
            }

            // below loop changes the clkgrp details
            // at first it contains the target of the clock id (clock id
            // always be a source) when the below loop ends, the clkgrp
            // contains the 'group index' of 'which split belongs to ith
            // clock'

            for (var i=0;i<n;i++)
            {
                for (var j=0;j<k ;j++)
                {
                    if ((sparr[j][0]<=clkgrp[i])&&(clkgrp[i]<=sparr[j][0]+2))
                    {
                        clkgrp[i]=sparr[j][1];
                        break;
                    }
                }
            }

            // this loop iterate all the tkscales and finally gives details
            // of 'which tkscale belongs to which clock'
            for (var i=0;i<tkgrp.length;i++)
            {
                for (var j=0;j<clkgrp.length;j++) // iterate from every clkgrp
                {
                    var gind = clkgrp[j];

                    var temp=-1;
                    if (gind!=-1) {
                        for (var x=0;x<grouparr[gind].length;x++)
                        {
                            if ((sparr[grouparr[gind][x]][0]<=tkgrp[i]) && (tkgrp[i]<=(sparr[grouparr[gind][x]][0]+2)))
                            {
                                tkgrp[i] = j;
                                temp = 0;
                                break;
                            }
                        }
                        if (temp==0)
                            break;
                    }
                }
            }

            if (tkgrp.length!=0) {
                for (var i=0;i<row;i++) {
                    if (tkgrp[i]!=-1) {
                        // adding the clock parameter(Period) to the tkclk
                        // in string format ( 0.1  )
                        tkclk[i]=(clkdetails[tkgrp[i]][0]).toString()+"  ";
                    }
                }
            }
        }

        if (flag1 == true && flag2 == true) {
            $.ajax({
                type:"post",
                url: "/requestfilename",
                async: true,
                cache: false,
                processData: false,
                contentType: false,
                success: function(name) {
                    if (name == "") {
                        wnd.destroy();
                        alert("You have not uploaded a .sci file!\nUpload file to proceed further");
                        return false;
                    }
                },
                error: function(name) {
                    alert("An error occurred!!");
                    return false;
                }
            });
        }

        if (flag1 == true && flag2 == undefined) {
            wnd.destroy();
            $.ajax({
                type:"post",
                url: "/requestfilename",
                async: true,
                cache: false,
                processData: false,
                contentType: false,
                success: function(name) {
                    if (name == "") {
                        alert("You have not uploaded a .sci file!\nUpload file to proceed further");
                        return false;
                    }
                    display_scifunc_output(name);
                },
                error: function(name) {
                    alert("An error occurred!!");
                    return false;
                }
            });
        }

        function display_scifunc_output(name) {
            setTimeout(function() { showimage(); }, 8000);
            function showimage() {
                var content = document.createElement('div');
                content.id = "image_display";
                var img_disp = document.createElement('img');
                img_disp.id = 'img';
                img_disp.src = '/res_imgs/img_test' + name + '.jpg';
                content.appendChild(img_disp);
                var wind = showModalWindow(graph, "Output", content, 610, 480);
            }
        }

        /* function which creates a slider for the tkscale data */
        function CreateSlider()
        {
            tkchange.innerHTML=0;

            for (var i=0;i<row;i++)
            {
                min=valArr[i][0];
                max=valArr[i][1];
                norm=valArr[i][2];
                if (!((min<=norm && norm<=max) || (min>max)))
                {
                    norm=(min+max)/2;
                }
                num=i+1;
                tag='tk'+(i+1);
                winArr[i] = window.open('/slider.html?min='+min+"&max="+max+"&num="+num+"&tag="+tag+"&norm="+norm+"&clientID="+clientID,"TK-"+i,'height=350,width=500');
                // creating a new window using 'slider.html' and some css
            }
        }

        // Send xcos file to server
        var form = new FormData()
        form.append("file",blob);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload", true);
        xhr.onload = function() {
            if (this.responseText.search(/^[0-9]+$/) == 0) {
                // If no error in uploading, initialize chart
                clientID = this.responseText;
                document.title = 'Xcos-' + clientID;

                if ((row<=10 && row >= 1))
                {
                    myAjaxreq("Start", "/UpdateTKfile?id="+clientID);
                }

                httpGetAsync("/start_scilab?id="+clientID, function(responseText) {
                    if (responseText != "") {
                        wnd.destroy();
                        alert(responseText);
                        return;
                    }
                    if ((row<=10 && row >= 1))
                    {
                        // if tkblocks are <= 10 then create slider else not
                        CreateSlider();
                    }
                    chart_init(wnd, affichwnd, with_interval, with_interval2);
                });
            } else {
                document.title = 'Xcos';
                alert("Error");
            }
        };
        xhr.send(form);
    });

    // Adds toolbar buttons into the status bar at the bottom
    // of the window.

    addToolbarButton(editor, status, 'zoomIn', '', 'images/zoom_in.png', true);
    addToolbarButton(editor, status, 'zoomOut', '', 'images/zoom_out.png', true);
    addToolbarButton(editor, status, 'actualSize', '', 'images/view_1_1.png', true);
    addToolbarButton(editor, status, 'fit', '', 'images/fit_to_size.png', true);

    // Creates the outline (navigator, overview) for moving
    // around the graph in the top, right corner of the window.
    var outln = new mxOutline(graph, outline);

    // To show the images in the outline, uncomment the following code
    // outln.outline.labelsVisible = true;
    // outln.outline.setHtmlLabels(true);

    // Fades-out the splash screen after the UI has been loaded.
    var splash = document.getElementById('splash');
    if (splash != null) {
        try {
            mxEvent.release(splash);
            mxEffects.fadeOut(splash, 100, true);
        } catch (e) {
            // mxUtils is not available (library not loaded)
            splash.parentNode.removeChild(splash);
        }
    }

    // Handles cursor keys - guides.html
    var nudge = function(keyCode) {
        if (!graph.isSelectionEmpty()) {
            var dx = 0;
            var dy = 0;
            if (keyCode == 37) {
                dx = -5;
            } else if (keyCode == 38) {
                dy = -5;
            } else if (keyCode == 39) {
                dx = 5;
            } else if (keyCode == 40) {
                dy = 5;
            }
            graph.moveCells(graph.getSelectionCells(), dx, dy);
        }
    };
    // Transfer initial focus to graph container for keystroke handling
    // graph.container.focus();
    // Handles keystroke events
    var keyHandler = new mxKeyHandler(graph);
    keyHandler.bindKey(37, function() {
        nudge(37);
    });
    keyHandler.bindKey(38, function() {
        nudge(38);
    });
    keyHandler.bindKey(39, function() {
        nudge(39);
    });
    keyHandler.bindKey(40, function() {
        nudge(40);
    });

    // Starts connections on the background in wire-mode
    var connectionHandlerIsStartEvent = graph.connectionHandler.isStartEvent;
    graph.connectionHandler.isStartEvent = function(me) {
        return connectionHandlerIsStartEvent.apply(this, arguments);
    };

    // Avoids any connections for gestures within tolerance except when in
    // wire-mode or when over a port
    var connectionHandlerMouseUp = graph.connectionHandler.mouseUp;
    graph.connectionHandler.mouseUp = function(sender, me) {
        if (this.first != null && this.previous != null) {
            var point = mxUtils.convertPoint(this.graph.container, me.getX(), me.getY());
            var dx = Math.abs(point.x - this.first.x);
            var dy = Math.abs(point.y - this.first.y);

            if (dx < this.graph.tolerance && dy < this.graph.tolerance) {
                // Selects edges in non-wire mode for single clicks, but
                // starts connecting for non-edges regardless of wire-mode
                if (this.graph.getModel().isEdge(this.previous.cell)) {
                    this.reset();
                }

                return;
            }
        }

        connectionHandlerMouseUp.apply(this, arguments);
    };

    mxEvent.disableContextMenu(container);

    // @Adhitya: Add focus to a mxCell
    if (mxClient.IS_NS) {
        mxEvent.addListener(graph.container, 'mousedown', function(evt) {
            if (!graph.isEditing()) {
                graph.container.setAttribute('tabindex', '-1');
                graph.container.focus();
            }
        });
    }

    load_example_content(example_content, filename);
}

/*
 * @jiteshjha
 * styleToObject(style) converts style string into an object.
 * Format : First item in the object will be 'default: linkStyle',
 * and the rest of items will be of the style 'mxConstants:value'
 */

function styleToObject(style) {
    //To add semicolon at the end if it isn't already present.
    if (style[style.length - 1] != ';') {
        style = style + ';';
    }
    var defaultStyle = style.substring(0, style.indexOf(';'));
    var styleObject = {
        "default": defaultStyle
    };
    var remainingStyle = style.substring(style.indexOf(';') + 1);

    /*
     * remainingStyle is the string without the default style.
     * For every key:value pair in the string,
     * extract the key(string before '=') and the value
     * (string before ';'), set the key:value pair into styleObject
     * and remainingStyle is set to a string without the key:value pair.
     */
    while (remainingStyle.length > 0) {
        var indexOfKey = remainingStyle.indexOf('=');
        var key = remainingStyle.substring(0, indexOfKey);
        remainingStyle = remainingStyle.substring(indexOfKey + 1);
        var indexOfValue = remainingStyle.indexOf(';');
        var value = remainingStyle.substring(0, indexOfValue);
        styleObject[key] = value;
        remainingStyle = remainingStyle.substring(indexOfValue + 1);
    }

    return styleObject;
}

/*
 * @jiteshjha
 * styleToObject(style) converts the object back to the style string.
 */
function objectToStyle(object) {
    var style = "";
    for (var key in object) {
        if (key.toString() == "default") {
            style += object[key] + ';';
        } else {
            style += (key + '=' + object[key] + ';');
        }
    }
    return style;
}

/*
 * Maverick
 * The following function is used to define a tag for entire diagram.
 * We can set context, model and setup parameters for the entire diagram
 * using this function.
 */


function XcosDiagram(context, model, attributes) {
    this.context = context;
    this.model = model;
    this.finalIntegrationTime = attributes;
}


/*
 * @jiteshjha, @pooja
 * setContext dialog box
 * Includes a set context instruction text and input text area.
 */

/*
 * Maverick
 * Added 'diagRoot' parameter.
 */
function showSetContext(graph, diagRoot) {

    // Create basic structure for the form
    var content = document.createElement('div');
    content.setAttribute("id", "setContext");

    // Add Form
    var myform = document.createElement("form");
    myform.method = "";
    myform.setAttribute("id", "formProperties");

    // Add set context string
    var descriptionSetContext = document.createElement("div");
    descriptionSetContext.innerHTML = "You may enter here scilab instructions to define symbolic parameters used in block definitions using Scilab instructions. These instructions are evaluated once confirmed(i.e. you click on OK and every time the diagram is loaded)";
    descriptionSetContext.setAttribute("id", "descriptionSetContext");
    myform.appendChild(descriptionSetContext);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // input text area
    var textareaSetContext = document.createElement("textarea");
    textareaSetContext.setAttribute("id", "textareaSetContext");

    myform.appendChild(textareaSetContext);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Line break
    var linebreak = document.createElement('br');
    myform.appendChild(linebreak);

    // Button - Submit
    var btn = document.createElement("button");
    btn.innerHTML = 'Ok';
    btn.type = "button";
    btn.name = "submit";
    btn.setAttribute("id", "buttonSetContext");

    var contextValue = handleContext("get");

    var displayValue = "";

    /*
     * Maverick
     * Modified the for loop because only requirement was to
     * traverse the array of 'contextValue' and not all the
     * elements of it.
     */
    for (var i = 0; i < contextValue.length; i++) {
        displayValue += contextValue[i] + "\n";
    }
    if (contextValue != "") {
        textareaSetContext.value = displayValue;
    } else {
        textareaSetContext.value = "";

    }

    // Executes when button 'btn' is clicked
    btn.onclick = function() {

        var input = document.getElementById('textareaSetContext').value;

        /*
         * Maverick
         * Code to extract context parameter values from the text area
         * containing the input.
         */
        var contextValues = [];
        var i = 0,
            temp = "";
        for (i = 0; i < input.length; i++) {
            if (input[i] == '\n') {
                if (temp != "") {
                    contextValues.push(temp);
                }
                temp = "";
                continue;
            }
            temp += input[i];
        }
        if (temp != "") {
            contextValues.push(temp);
        }

        diagRoot.context = contextValues;
        diagRoot.context.scilabClass = "String[]";
        handleContext("set", contextValues);
        wind.destroy();
    };

    myform.appendChild(btn);
    content.appendChild(myform);
    var wind = showModalWindow(graph, 'Set Context', content, 450, 350);
};

function showPropertiesWindow(graph, cell, diagRoot) {

    var name = cell.getAttribute('blockElementName');
    if(name!="LOOKUP_f" && name!="CURV_f" && name != "scifunc_block_m") {
        var defaultProperties = cell.blockInstance.instance.get();
        //window[name]("get");
        /*
         * {
         *   nbr_curves: ["Number of curves", 1],
         *   clrs: ["color (>0) or mark (<0)", [1, 2, 3, 4, 5, 6, 7, 13]],
         *   siz: ["line or mark size", [1, 1, 1, 1, 1, 1, 1, 1]],
         *   win: ["Output window number (-1 for automatic)", -1],
         *   wpos: ["Output window position", [-1, -1]],
         *   wdim: ["Output window sizes", [-1, -1]],
         *   vec_x: ["Xmin and Xmax", [-15, 15]],
         *   vec_y: ["Ymin and Ymax", [-15, 15]],
         *   vec_z: ["Zmin and Zmax", [-15, 15]],
         *   param3ds: ["Alpha and Theta", [50, 280]],
         *   N: ["Buffer size", 2]
         * };
         */

        // var defaultProperties=window["CONST_m"]("get");

        // Create basic structure for the form
        var content = document.createElement('div');
        content.setAttribute("id", "contentProperties");

        // Heading of content
        var heading = document.createElement('h3');
        heading.innerHTML = cell.blockInstance.instance.get_popup_title();
        heading.id = "headingProperties"
        content.appendChild(heading);

        // Add Form
        var myform = document.createElement("form");
        myform.method = "post";
        myform.id = "formProperties";

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        for (var key in defaultProperties) {
            if (defaultProperties.hasOwnProperty(key)) {

                // Input Title
                var fieldName = defaultProperties[key];
                var namelabel = document.createElement('label');
                namelabel.innerHTML = defaultProperties[key][0];
                myform.appendChild(namelabel);

                // Input
                var input = document.createElement("input");
                input.name = key;
                input.value = defaultProperties[key][1];
                input.setAttribute("id", key.toString());
                input.setAttribute("class", "fieldInput");
                myform.appendChild(input);

                // Line break
                var linebreak = document.createElement('br');
                myform.appendChild(linebreak);

                // Line break
                var linebreak = document.createElement('br');
                myform.appendChild(linebreak);
            }
        }

        // Line break
        var linebreak = document.createElement('br');
        myform.appendChild(linebreak);

        // Button - Submit
        var btn = document.createElement("button");
        btn.innerHTML = 'Submit';
        btn.type = "button";
        btn.name = "submit";
        //btn.id = "submit";

        // Executes when button 'btn' is clicked
        btn.onclick = function() {

            /*
             * Loading XML of last graph configuration so that all the links
             * nodes of the previous xml can be copied to the new XML
             */

            var encPrevXml = new mxCodec(mxUtils.createXmlDocument());
            var nodePrevXml = encPrevXml.encode(diagRoot);
            var strPrevXml = mxUtils.getPrettyXml(nodePrevXml);
            strPrevXml = mxUtils.parseXml(strPrevXml);
            var xslPrevXml = trySomething("finalmodsheet.xsl");
            function trySomething(x) {
                if (window.ActiveXObject) {
                    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
                } else {
                    xhttp = new XMLHttpRequest();
                }
                xhttp.open("GET", x, false);
                try {
                    xhttp.responseType = "msxml-document"
                } catch (err) {}
                xhttp.send("");
                return xhttp.responseXML;
            }
            var xsltProcessorPrevXml = new XSLTProcessor();
            xsltProcessorPrevXml.importStylesheet(xslPrevXml);
            var resultDocumentPrevXml = xsltProcessorPrevXml.transformToDocument(strPrevXml);
            /*
             * Maverick
             * Using resultDocument.documentElement to remove an additional tag
             * "<#document>" created by the XSLTProcessor.
             */
            strPrevXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" + mxUtils.getPrettyXml(resultDocumentPrevXml.documentElement);
            strPrevXml = strPrevXml.replace(/\n\n/g, "\n");
            strPrevXml = strPrevXml.replace(/\n*/, '');
            strPrevXml = strPrevXml.replace(/>\s*</g, '><');
            strPrevXml = strPrevXml.replace(/<!--[\s\S]*?-->/g, '');
            var docPrevXml = mxUtils.parseXml(strPrevXml);
            var codecPrevXml = new mxCodec(docPrevXml);
            var rootNode = docPrevXml.documentElement;
            while(rootNode.nodeName != 'root')
            {
                rootNode = rootNode.firstChild;
            }
            var currentNode = rootNode.firstChild;

            // Updating model
            var parent = graph.getDefaultParent();
            var model = graph.getModel();
            var v1 = null;
            var doc = mxUtils.createXmlDocument();
            model.beginUpdate();
            try {

                var propertiesObject = {
                    id: cell.id
                };

                for (var key in defaultProperties) {
                    if (defaultProperties.hasOwnProperty(key)) {
                        propertiesObject[key] = document.getElementById(key.toString()).value;
                    }
                }
                var geometry = cell.getGeometry();
                var x=geometry.x;
                var y=geometry.y;

                var details_instance = new window[name]();
                var details = cell.blockInstance.instance.set(propertiesObject);
                // window[name]("set",cell.value,propertiesObject);
                editor.execute('deleteBlock',(editor, cell));
                var enc = new mxCodec(mxUtils.createXmlDocument());
                var node = enc.encode(details);
                var temp = enc.encode(parent);

                // Get the stylesheet for the graph
                var stylesheet = graph.getStylesheet();
                // From the stylesheet, get the style of the particular block
                var style = stylesheet.styles[name];

                /*
                 * When a particular block is loaded for the first time, the
                 * image in the style of the block will be a path to the image.
                 * Set the label in the style property of the block has a html
                 * image, and set the image in the style property as null
                 *
                 * NOTE: Since the image of any block need not be changed for
                 *       for every movement of that block, the image must be
                 *       set only once.
                 */

                if (style != null && style['image'] != null) {

                    // Make label as a image html element
                    var label = '<img src="' + style['image'] + '" height="80" width="80">';
                    // Set label
                    style['label'] = label;

                    style['imagePath'] = style['image'];

                    // Set image as null
                    style['image'] = null;

                    // Add the label as a part of node
                    node.setAttribute('label', label);
                }

                /*
                 * If a particular block with image tag in it's style property
                 * has been invoked already, the image tag would be null for
                 * any successive instances of the same block. Hence, set the
                 * label from the label tag in style which was set when that
                 * blockModel was invoked on the first time.
                 */

                if (style != null && style['label'] != null) {

                    // Set label from the label field in the style property
                    node.setAttribute('label', style['label']);
                }

                node.setAttribute('parent', temp.getAttribute('id'));
                var i, arr = [];
                var details_instance=cell.blockInstance.instance;
                var blockModel = details_instance.x.model;
                var graphics = details_instance.x.graphics;

                /* To determine number and type of Port*/
                var inputPorts = [],
                    outputPorts = [],
                    controlPorts = [],
                    commandPorts = [];
                if (blockModel.in.height != null) {
                    arr = getData(graphics.in_implicit);
                    if (arr.length != 0) {
                        inputPorts = arr;
                    } else {
                        for (i = 0; i < blockModel.in.height; i++) {
                            inputPorts.push("E");
                        }
                    }
                }
                if (blockModel.out.height != null) {
                    arr = getData(graphics.out_implicit);
                    if (arr.length != 0) {
                        outputPorts = arr;
                    } else {
                        for (i = 0; i < blockModel.out.height; i++) {
                            outputPorts.push("E");
                        }
                    }
                }
                if (blockModel.evtin.height != null) {
                    for (i = 0; i < blockModel.evtin.height; i++) {
                        controlPorts.push("CONTROL");
                    }
                }
                if (blockModel.evtout.height != null) {
                    for (i = 0; i < blockModel.evtout.height; i++) {
                        commandPorts.push("COMMAND");
                    }
                }
                v1 = graph.insertVertex(parent, null, node, x, y, 80, 80, name);

                // @Chhavi: Additional attribute to store the block's instance
                v1.blockInstance = createInstanceTag(details_instance);
                v1.currentAngle = 0;
                v1.flipX = 1;
                v1.flipY = 1;
                createPorts(graph, v1, inputPorts, controlPorts, outputPorts, commandPorts);
                v1.setConnectable(false);
            } finally {
                model.endUpdate();
            }

            /*
             * The code below is responsible for moving the new (non-links)
             * node created after the set function is called back to their
             * previous positions as in their previous XML.  This is done to
             * retain the id's so that the Link node of previous XML can be
             * used to create connecting wires for the new XML also.
             */

            var referenceModelCount = referenceModelProps.length;
            var missingKeys = [];
            var lastId = Math.max(...Object.keys(model.cells));

            for( var i=0;i< referenceModelCount ; i++)
            {
                var present = false;
                for(var key in model.cells)
                {
                    (model.cells.hasOwnProperty(key))
                    {
                        if(referenceModelProps[i].id == key)
                        {
                            present = true;
                            break;
                        }
                    }
                }
                if(present == false)
                    missingKeys.push(referenceModelProps[i].id);
            }

            var newIDs= [];
            for(var i=modelNextId;i<=lastId;i++)
                newIDs.push(i);
            var j = 0;

            for(var i = 0; i < missingKeys.length; i++)
            {
                // To find the style(name) of the block with the id equal to
                // missingKeys[i]
                var referenceModelStyle = referenceModelProps.find( function (obj) {
                    return obj.id == missingKeys[i];
                }).style;

                if(model.cells[newIDs[j]].style.endsWith('Port')) {
                    if( referenceModelStyle == model.cells[newIDs[j]].style ) {
                        model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                        model.cells[missingKeys[i]].id = String(missingKeys[i]);
                        delete model.cells[newIDs[j++]];
                    }
                    else {
                        var tempId = j;
                        while(newIDs[++j] <= lastId )
                        {
                            if(referenceModelStyle == model.cells[newIDs[j]].style) {
                                model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                                model.cells[missingKeys[i]].id = String(missingKeys[i]);
                                delete model.cells[newIDs[j]];
                                newIDs.splice(j,1);
                                j = tempId;
                                break;
                            }
                        }
                    }
                }
                else if (model.cells[newIDs[j]].style) {
                    model.cells[missingKeys[i]] = model.cells[newIDs[j]];
                    model.cells[missingKeys[i]].id = String(missingKeys[i]);
                    delete model.cells[newIDs[j++]];
                }
            }
            referenceModelProps = [];
            newIDs = [];

            model.beginUpdate();
            try {
                // Connecting the blocks by inserting link nodes
                while(currentNode!=null)
                {
                    var curNodeName = currentNode.nodeName;
                    if(curNodeName.endsWith('Link'))
                    {
                        var pointsArray = [];
                        var newSourceCell = graph.getModel().getCell(currentNode.getAttribute('source'));
                        var newTargetCell = graph.getModel().getCell(currentNode.getAttribute('target'));

                        if(newSourceCell.getEdgeCount() <=0 && newTargetCell.getEdgeCount()<=0) {

                            var childNode = currentNode.firstChild;
                            if (childNode != null) {
                                if (childNode.nodeName == 'mxGeometry') {
                                    var tempNode = childNode.firstChild;
                                    if (tempNode != null) {
                                        if (tempNode.nodeName == 'mxPoint') {
                                            pointsArray.push(new mxPoint(tempNode.getAttribute('x'), tempNode.getAttribute('y')));
                                        } else {
                                            if (tempNode.nodeName == 'Array') {
                                                var mxPointNode = tempNode.firstChild;
                                                while (mxPointNode != null) {
                                                    pointsArray.push(new mxPoint(mxPointNode.getAttribute('x'), mxPointNode.getAttribute('y')));
                                                    mxPointNode = mxPointNode.nextSibling;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            createEdgeObject(graph, newSourceCell, newTargetCell, null);
                        }
                    }
                    currentNode=currentNode.nextSibling;
                }

            } finally {
                model.endUpdate();
            }
            graph.setSelectionCell(v1);
            graph.refresh();
            wind.destroy();
        };
        myform.appendChild(btn);


        // Button - Reset
        var btn = document.createElement("button");
        btn.innerHTML = 'Reset';
        btn.type = "button";
        btn.name = "submit";
        btn.id = "resetButtonProperties";
        btn.onclick = function() {
            // Reset
            for (var key in defaultProperties) {
                if (defaultProperties.hasOwnProperty(key)) {
                    var element = document.getElementById(key.toString());
                    element.value = defaultProperties[key][1];
                }
            }
        };

        myform.appendChild(btn);
        // Base height without fields : 135 px
        height = 135 + 26 * defaultProperties.length + 15;

        content.appendChild(myform);
        var wind = showModalWindow(graph, 'Properties', content, 450, height);

    }else{
        //This function is specifically for sciFunc_block_m
        if(name=="scifunc_block_m")
        {
            create_scifunc_popups(graph,cell,name,diagRoot);
        }
        else
        {
            /* Function is present inside LOOKUP_CURV.js */
            showGraphWindow(graph,cell,diagRoot);
        }
    }

    /*
     * alert("lookup_f block ");
     * // Create basic structure for the form
     * var content = document.createElement('div');
     * content.setAttribute("id", "lookup_f_Properties");

     * // Heading of content
     * var heading = document.createElement('div');
     * heading.innerHTML = "<ul id='menu'><li><a href='#'>Main Tab</a><ul><li><a href='#'>This is link A</a></li><li><a href='#'>This is link B</a></li></ul></li></ul>";
     * // heading.id = "headingProperties"
     * height=300;
     * content.appendChild(heading);
     * var wind = showModalWindow(graph, 'edit_curv', content, 450, height);
     */

};

/*
 * @jiteshjha
 * createEdgeObject(@parameters) creates an edge on the graph DOM
 * @Parameters :
 *              source -> source object for the edge
 *              target -> destination object for the edge
 *              points -> waypoints to be inserted in the geometry
 */

function createEdgeObject(graph, source, target, points) {

    // Start the update on the graph
    graph.getModel().beginUpdate();

    try {

        // Create an edge from the given source object and target object
        var edge = graph.insertEdge(graph.getDefaultParent(), null, '', source, target);
        // Get geometry of the edge
        var geometry = graph.getModel().getGeometry(edge);
        /*
         * Clone the geometry object
         * NOTE: Direct manipulation of the geometry object may not be
         *       registered as an action for some cases, hence we clone the
         *       geometry, manipulate it and set the geometry.
         */
        var cloneGeometry = geometry.clone();

        // Add points in the cloned geometry
        cloneGeometry.points = points;

        // Set the changed geometry for the edge
        graph.getModel().setGeometry(edge, cloneGeometry);

        // Refresh to reflect changes made
        graph.refresh();
    } finally {

        // End the update
        graph.getModel().endUpdate();
    }

    return edge;
}
