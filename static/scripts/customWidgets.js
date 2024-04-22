
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
        var template = "<div class='col-12'><div class='row widgetTop'>  <button class='col-1 moveButton' onclick ='moveOrder(this, -1)' + >&#8595;</button>"
        template += "<button class=' col-1 moveButton' onclick ='moveOrder(this,1)' + >&#8593;</button>";
        template += "<button class='col-1 offset-9 widgetDelete' onclick =deleteWidget(this," + "'.descriptiveWidget')" + ">X</button> </div>";
    	template +=  "<div class='row'> <div class='col-2 columnDrop' ondrop='columnDropDescriptive(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template += "<table class='col-10 descriptiveTable'><tr><th>Mean</th><th>Median</th><th>Mode</th><th>Variance</th><th>Standard Deviation</th><th>Count</th></tr>"
        template+= "<tr><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td></tr></table></<div></div>"
        this.innerHTML = template;
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
    	var template = "<div class='col-12'><div class='row widgetTop'> <button class='col-1 moveButton' onclick ='moveOrder(this, -1)'>&#8595;</button> <button class='col-1 moveButton' onclick ='moveOrder(this, 1)' + >&#8593;</button>";
        template += "<button class='col-1 offset-9 widgetDelete' onclick =deleteWidget(this," + "'.normalityWidget')" + ">X</button> </div>";
        template +=  "<div class='row '> <div class='col-2 normalityDrop' ondrop='columnDropNormality(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template+= "<div class='col-8 normalImageHolder'></<div></div> <div class='row'> "
        template += "<table class='col-5 offset-3 normalityTable'><tr><th>PValue</th><th>Statistic</th></tr>";
        template+= "<tr><td class='normalityAnswer'>0</td><td class='normalityAnswer'>0</td></tr></table></div></div>";
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
        var template = "<div class='col-12'><div class='row widgetTop '> <button class='col-1 moveButton' onclick ='moveOrder(this, -1)' + >&#8595;</button> <button class='col-1 moveButton' onclick ='moveOrder(this, 1)' + >&#8593;</button>";
        template += "<button class='col-1 offset-9 widgetDelete' onclick =deleteWidget(this," + "'.ttestWidget')" + ">X</button></div></div>";
    	template +=  "<div class='row '> <div class='col-2 ttestDrops'> <div class='ttestDrop' ondrop='columnDropTTest(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>"
        template += "<div class='ttestDrop' ondrop='columnDropTTest(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template += "<p > Equal var? </p>";
        template += "<select class =' ttestIddChoice'><option value='True'>True</option><option value='False'>False</option></select></div><div class='col-8 ttestImageHolder'></div></div>";
        template+= "<div class='row '> <button class='col-2 calculateTTest' onclick='ttestCalculation(this)'>Calculate</button>"
        template += "<table class='col-9 ttestTable'><tr><th>PValue</th><th>Test Statistic</th></tr>"
        template+= "<tr><td class='ttestAnswer'>0</td><td class='ttestAnswer'>0</td></tr></table> </<div> </div></div>"
        this.innerHTML = template;
    }
}

customElements.define('ttest-widget', ttestWidget);