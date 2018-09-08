"use strict";
var Dashboard = /** @class */ (function () {
    function Dashboard() {
        this.records = [];
        this.recordsAPIURL = "https://cake-catcher.herokuapp.com/api/v1/records";
        this.element = document.querySelector('#dashboard-list');
    }
    Dashboard.prototype.getRecords = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        if (reset) {
            this.element.innerHTML = "";
        }
        axios.get(this.recordsAPIURL)
            .then(function (response) {
            records = response.data;
            if (records.length < 1) {
                _this.element.parentNode.appendChild(create('h3', 'Sorry, no records now :('));
            }
            else {
                records.map(function (r) {
                    _this.element.appendChild(create('li', r.username + " - " + r.scores));
                });
            }
        }).catch(function () {
            _this.element.parentNode.appendChild(create('h3', 'Cannot get any records'));
        });
        var records = [];
    };
    return Dashboard;
}());
