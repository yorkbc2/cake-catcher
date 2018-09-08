interface IDashboardRecord {
    username: string;
    scores: number;
}

class Dashboard {
    records: Array<IDashboardRecord> = [];
    recordsAPIURL: string = "https://cake-catcher.herokuapp.com/api/v1/records";

    element: HTMLOListElement = <HTMLOListElement>document.querySelector('#dashboard-list');

    getRecords(reset: boolean = false) {
        if (reset) {
            this.element.innerHTML = "";
        }
        axios.get(this.recordsAPIURL)
            .then((response: any) => {
                records = response.data;
                if (records.length < 1) {
                    (<HTMLElement>this.element.parentNode).appendChild(<HTMLElement>create('h3', 'Sorry, no records now :('));
                } else {
                    records.map((r: any) => {
                        this.element.appendChild(<HTMLElement>create('li', `${r.username} - ${r.scores}`));
                    });    
                }
            }).catch(() => {
                (<HTMLElement>this.element.parentNode).appendChild(<HTMLElement>create('h3', 'Cannot get any records'));
            });
        var records = [];
    }
}