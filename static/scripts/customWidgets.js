
class descriptiveWidget extends HTMLElement {
	constructor() {
        super();
    }
    connectedCallback() {        
        this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    render(){
        var template =
        `<div class='col-12'>
            <div class='row widgetTop'>  
                <button class='col-1 moveButton' onclick ='moveOrder(this, -1)' + >&#8595;</button>
                <button class=' col-1 moveButton' onclick ='moveOrder(this,1)' + >&#8593;</button>
                <button class='col-1 offset-9 widgetDelete' onclick ='deleteWidget(this, ".descriptiveWidget")' + ">X</button> 
        </div>
    	<div class='row'>
            <div class='col-2 mt-3'> 
                <div class='mt-3 columnDrop' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace's> Drag column </p>
                </div>
            <div class='row'> 
                <button class='btn btn-sm p-0 mt-3  calculateTTest' onclick='descriptiveStatCalculation(this)'>Calculate</button>
            </div>
        </div>
            <table class='col-10 descriptiveTable'>
                <tr>
                    <th>Mean</th><th>Median</th><th>Mode</th><th>Variance</th><th>Standard Deviation</th><th>Count</th><th>Min</th><th>Max</th></tr>
                <tr>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                    <td class='descriptiveAnswer'>0</td>
                </tr>
            </table>
        </div>
        </div>`
        this.innerHTML = template
    }
}

customElements.define('descriptive-widget', descriptiveWidget);



class normalityWidget extends HTMLElement {
	constructor() {
        super();
    }
    connectedCallback() {        
        this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    render(){
    	var template = `
        <div class='col-12'>
            <div class='row widgetTop'> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, -1)'>&#8595;</button> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, 1)' + >&#8593;</button>
                <button class='col-1 offset-9 widgetDelete' onclick ='deleteWidget(this, ".normalityWidget")'>X</button> 
            </div>
            <div class='row mt-3'> 
                <div class=col-2>
                    <div class='columnDrop col-11 offset-1 ' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                        <p class='border border-dark dropPlace'> Drag column </p>
                    </div>
                    <div class='row'>
                        <button class='btn btn-sm col-11 offset-1 calculateTTest' onclick='normalityCalculation(this)'>Calculate</button>
                    </div>
                </div>
                <div class='col-8 normalImageHolder'></<div>
            </div>
                <div class='row'>
                    <table class='col-5 offset-3 normalityTable'><tr><th>PValue</th><th>Statistic</th></tr>
                    <tr><td class='normalityAnswer'>0</td><td class='normalityAnswer'>0</td></tr></table>
                </div>
            </div>
        </div>`
        this.innerHTML = template;
    }
}

customElements.define('normality-widget', normalityWidget);



class ttestWidget extends HTMLElement {
	constructor() {
        super();
    }
    connectedCallback() {        
        this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    render(){
        var template = `
        <div class='col-12'>
            <div class='row widgetTop '> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, -1)' + >&#8595;</button> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, 1)' + >&#8593;</button>
                <button class='col-1 offset-9 widgetDelete' onclick ='deleteWidget(this,".ttestWidget")' + ">X</button>
            </div>
        </div>
    	<div class='row '> 
            <div class='col-2 mt-3 ttestDrops'> 
                <div class='ttestDrop' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <div class='ttestDrop' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <p > Equal var? </p>
                <select class =' ttestIddChoice'><option value='True'>True</option><option value='False'>False</option></select>
            </div>
            <div class='col-8 ttestImageHolder'>
            </div>
        </div>
        <div class='row '> 
            <button class='btn btn-sm ms-3 col-2 calculateTTest' onclick='ttestCalculation(this)'>Calculate</button>
            <table class='col-5 offset-2 ttestTable'><tr><th>PValue</th><th>Test Statistic</th></tr>
            <tr><td class='ttestAnswer'>0</td><td class='ttestAnswer'>0</td></tr></table> 
        </<div>`
        this.innerHTML = template;
    }
}

customElements.define('ttest-widget', ttestWidget);


class correlationWidget extends HTMLElement {
	constructor() {
        super();
    }
    connectedCallback() {        
        this.render();
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    render(){
        var template = `
        <div class='col-12'>
            <div class='row widgetTop '> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, -1)' + >&#8595;</button> 
                <button class='col-1 moveButton' onclick ='moveOrder(this, 1)' + >&#8593;</button>
                <button class='col-1 offset-9 widgetDelete' onclick = 'deleteWidget(this, ".correlationWidget")' + ">X</button>
            </div>
        </div>
    	<div class='row '> 
            <div class='col-2 mt-3 doubleDrops'> 
                <div class='ttestDrop' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <div class='ttestDrop' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <button class='ms-3 calculateCorrelation' onclick='correlationCalculation(this)'>Calculate</button>
            </div>
        <div class='row '>
                <table class='col-5 offset-2 correlationTable'>
                    <tr><th>Correlation</th><th>pValue</th></tr>
                    <tr><td class='correlationAnswer'>0</td><td class='correlationAnswer'>0</td></tr>
                </table> 
        </<div>`
        this.innerHTML = template;
    }
}

customElements.define('correlation-widget', correlationWidget);