
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
                <p class='col-2 offset-3'>Descriptive Statistics</p>
                <button class='col-1 offset-4 widgetDelete' onclick ='deleteWidget(this, ".descriptiveWidget")' + ">X</button> 
            </div>
    	    <div class='row'>
                <div class='col-2 mt-3'> 
                    <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                        <p class='border border-dark dropPlace's> Drag column </p>
                    </div>
                    <button class='btn btn-sm col-12 orangeBackground' onclick='statCalculation(this, ".descriptiveWidget", descriptiveStatCalculation)'>Calculate</button>
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
                <p class='col-2 offset-3'>Normality Test</p>
                <button class='col-1 offset-4 widgetDelete' onclick ='deleteWidget(this, ".normalityWidget")'>X</button> 
            </div>
            <div class='row mt-3'> 
                <div class=col-2>
                    <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                        <p class='border border-dark dropPlace'> Drag column </p>
                    </div>
                    <button class='btn btn-sm col-12 orangeBackground' onclick='statCalculation(this, ".normalityWidget", normalityCalculation)'>Calculate</button>
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
                <p class='col-2 offset-3'>T Test</p>
                <button class='col-1 offset-4 widgetDelete' onclick ='deleteWidget(this,".ttestWidget")' + ">X</button>
            </div>
        </div>
    	<div class='row '> 
            <div class='col-2 mt-3 ttestDrops'> 
                <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <p class='col-6'> Equal var? </p>
                <select class ='col-6 ttestIddChoice'><option value='True'>True</option><option value='False'>False</option></select>
                <button class='btn btn-sm col-12 orangeBackground' onclick='statCalculation(this, ".ttestWidget", ttestCalculation)'>Calculate</button>
            </div>
            <div class='col-8 ttestImageHolder'>
            </div>
        </div>
        <div class='row '> 
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
                <p class='col-2 offset-3'>Correlation Test</p>
                <button class='col-1 offset-4 widgetDelete' onclick = 'deleteWidget(this, ".correlationWidget")' + ">X</button>
            </div>
        </div>
    	<div class='row '> 
            <div class='col-2 mt-3 doubleDrops'> 
                <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <div class='columnDrop text-center' ondrop='columnDrop(event)' ondragover='allowDrop(event)'>
                    <p class='border border-dark dropPlace'> Drag column </p>
                </div>
                <button class='btn btn-sm col-12 orangeBackground' onclick='statCalculation(this, ".correlationWidget", correlationCalculation)'>Calculate</button>
            </div>
            <div class='col-8 correlationImageHolder'>
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