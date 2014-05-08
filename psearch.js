function psearch(attr, value) {
	//console.log(psearchSub(document.documentElement, name));
	return psearchSub(document.documentElement, attr, value);
}

function psearchSub(elem, attr, value) {
	var result = [];
	
	if (matchAttr(elem, attr, value))
		result.push(elem);

	//process childNodes
	var childNodes = getChildNodes(elem);
	var childNodesLen = childNodes.length;
	for (var i=0; i<childNodesLen; i++) {

		if (childNodes[i] !== undefined) {

			//console.log(elem.tagName);
			result = result.concat(psearchSub(childNodes[i], attr, value));

		}
	}
	return result;
}

//Old Code

// function psearchSub(elem, name) {
// 	var result = [];
	
// 	if (matchName(elem, name))
// 		result.push(elem);

// 	//process childNodes
// 	var childNodesLen = elem.childNodes.length;
// 	for (var i=0; i<childNodesLen; i++) {

// 		if (elem.childNodes[i] !== undefined) {

// 			//console.log(elem.tagName);
// 			result = result.concat(psearchSub(getElem(elem.childNodes[i]), name));

// 		}
// 	}
// 	return result;
// }

function getChildNodes(elem) {
	return getElem(elem).childNodes;
}

function getElem(node) {
	//var nodeName = node.nodeName.toLowerCase();

	if (node.tagName !== undefined) {
		var nodeName = node.tagName.toLowerCase();
		if ((nodeName === 'iframe') || (nodeName === 'frame'))
			return getFrame(node);
	}

	return node;
}

function getFrame(frameNode) {
	//console.log('frame');
	
	//search for tagName === 'HTML' instead of using getElementsByTagName
	var frameChildNodesLen = frameNode.contentDocument.childNodes.length;

	for (var i=0; i<frameChildNodesLen; i++) {
		if (frameNode.contentDocument.childNodes[i].tagName !== undefined) {
			if (frameNode.contentDocument.childNodes[i].tagName.toLowerCase() === 'html')
				return frameNode.contentDocument.childNodes[i];
		}
	}

	//cannot find HTML
	return null;
	//return frameNode.contentDocument.getElementsByTagName('html')[0];
}

function matchAttr(elem, attr, value) {
	if (getAttr(elem, attr) === value)
		return true;
	else
		return false;
}

function getAttr(elem, attr) {

	//old way to avoid exception
	//if ((elem.nodeValue !== null) && (elem.nodeValue !== 1))
		//return '';

	if (typeof(elem.getAttribute) === 'undefined')
		return '';

	//var name=elem.getAttribute('name');
	var attr=elem.getAttribute(attr);
	if (attr !== null) {
		
		//if (typeof(elem.tagName) !== 'undefined')
			//console.log('tagName: ' + elem.tagName);

		//console.log('attrName: ' + name);

		return attr;

	} else {
		return '';
	}
}