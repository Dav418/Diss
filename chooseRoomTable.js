var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

var roomTable = function (_Component) {
    _inherits(roomTable, _Component);

    function roomTable() {
        _classCallCheck(this, roomTable);

        var _this = _possibleConstructorReturn(this, (roomTable.__proto__ || Object.getPrototypeOf(roomTable)).call(this));

        _this.state = { rooms: [{ id: 1, roomName: 'Test 1', pNumb: 1, state: 'Public' }, { id: 2, roomName: 'Test 2', pNumb: 2, state: 'Public' }, { id: 3, roomName: 'Test 3', pNumb: 3, state: 'Private' }, { id: 4, roomName: 'test 4', pNumb: 4, state: 'Private' }] };
        return _this;
    }

    _createClass(roomTable, [{
        key: 'renderTableData',
        value: function renderTableData() {
            return this.state.rooms.map(function (room, index) {
                var id = room.id,
                    roomName = room.roomName,
                    pNumb = room.pNumb,
                    state = room.state; //destructuring

                return React.createElement(
                    'tr',
                    { key: id },
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'button',
                            null,
                            'Join!'
                        )
                    ),
                    React.createElement(
                        'td',
                        null,
                        roomName
                    ),
                    React.createElement(
                        'td',
                        null,
                        pNumb
                    ),
                    React.createElement(
                        'td',
                        null,
                        state
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'th',
                        null,
                        React.createElement('tr', null),
                        React.createElement(
                            'tr',
                            null,
                            'Room Name'
                        ),
                        React.createElement(
                            'tr',
                            null,
                            'Number of players'
                        ),
                        React.createElement(
                            'tr',
                            null,
                            'State'
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.renderTableData
                    )
                )
            );
        }
    }]);

    return roomTable;
}(Component);

export default roomTable;

ReactDOM.render(roomTable, document.getElementById("roomTableID"));