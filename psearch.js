function psearch(name) {
	//console.log(psearchSub(document.documentElement, name));
	return psearchSub(document.documentElement, name);
}

function psearchSub(elem, name) {
	var result = [];
	
	if (matchName(elem, name))
		result.push(elem);

	//process childNodes
	var childNodes = getChildNodes(elem);
	var childNodesLen = childNodes.length;
	for (var i=0; i<childNodesLen; i++) {

		if (childNodes[i] !== undefined) {

			//console.log(elem.tagName);
			result = result.concat(psearchSub(childNodes[i], name));

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

function matchName(elem, name) {
	if (getName(elem) === name)
		return true;
	else
		return false;
}

function getName(elem) {

	//old way to avoid exception
	//if ((elem.nodeValue !== null) && (elem.nodeValue !== 1))
		//return '';

	if (typeof(elem.getAttribute) === 'undefined')
		return '';

	var name=elem.getAttribute('name');
	if (name !== null) {
		
		//if (typeof(elem.tagName) !== 'undefined')
			//console.log('tagName: ' + elem.tagName);

		//console.log('attrName: ' + name);

		return name;

	} else {
		return '';
	}
}