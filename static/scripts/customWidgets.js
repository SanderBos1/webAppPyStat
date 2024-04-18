
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
        var template = "<div class='widgetTop flex'> <button class='widgetDelete' onclick =deleteWidget(this," + "'.descriptiveWidget')" + ">X</button> </div>";
    	template +=  "<div class='widgetContent flex'> <div class='columnDrop' ondrop='columnDropDescriptive(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template += "<table class='descriptiveTable'><tr><th>Mean</th><th>Median</th><th>Mode</th><th>Variance</th><th>Standard Deviation</th><th>Count</th></tr>"
        template+= "<tr><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td><td class='descriptiveAnswer'>0</td></tr></table></<div>"
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
    	var template = "<div class='widgetTop flex'> <button class='widgetDelete' onclick =deleteWidget(this," + "'.normalityWidget')" + ">X</button> </div>";
        template +=  "<div class='widgetContent flex'> <div class='normalityDrop' ondrop='columnDropNormality(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template+= "<div class='normalImageHolder'></div></<div>"
        template += "<table class='normalityTable'><tr><th>PValue</th><th>Statistic</th></tr>";
        template+= "<tr><td class='normalityAnswer'>0</td><td class='normalityAnswer'>0</td></tr></table>";
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
        var template = "<div class='widgetTop flex'> <button class='widgetDelete' onclick =deleteWidget(this," + "'.ttestWidget')" + ">X</button>; </div>";
    	template +=  "<div class='widgetContent flex'> <div class='ttestDrops'> <div class='ttestDrop' ondrop='columnDropTTest(event)' ondragover='allowDrop(event)'><p> Drag column </p></div>";
        template += "<div class='ttestDrop' ondrop='columnDropTTest(event)' ondragover='allowDrop(event)'><p> Drag column </p></div></div>";
        template+= "<div class='ttestResults'><div class='ttestImageHolder'></div></<div>"
        template += "<table class='ttestTable'><tr><th>PValue</th><th>Test Statistic</th></tr>"
        template+= "<tr><td class='ttestAnswer'>0</td><td class='ttestAnswer'>0</td></tr></table> </<div></div>"
        this.innerHTML = template;
    }
}

customElements.define('ttest-widget', ttestWidget);