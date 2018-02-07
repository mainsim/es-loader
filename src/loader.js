/**
 * @description Javascript asynchronous file loader
 * @version 1.0
 * @author Macolic Sven <macolic.sven@gmail.com>
 *
 * @license 
 *
 *
 * Copyright (c) 2018 Macolic Sven
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

class loader {
	
	/**
	 * @description Class constructor
	 * @returns void
	 */
	constructor() {
		this.classes = new Map
		this.app_data = new String
		window.onload = e => {
			this.app_data = document.querySelector('[app-load]').getAttribute('app-load')
			this.load([this.app_data]).then(cls => {
				let start = new cls[this.app_data.match(/\//) ? this.app_data.split('/').pop() : [this.app_data]]
			})
		}
	}

	/**
	 * @description Classes collection setter
	 * @param {object} cls - Class to register
	 * @returns void
	 */
	set include(cls) {
		this.classes.set(cls.name, cls)
	}

	/**
	 * @description Classes collection getter
	 * @returns Class collection object
	 */
	get include() {
		return this.classes
	}

	/**
	 * @description Classes preload method
	 * @param {string} clsName - Class name
	 * @param {string} ns - Class namespace
	 * @param {array} classes - File names for loading
	 * @param {object} fn - Function containing promised class
	 * @returns void
	 */
	preload(clsName, ns, classes, fn) {
		let cls
		switch(this.include.has(clsName)) {
			case true:
				cls = this.include.get(clsName)				
			break
			default:
				cls = new Object
				this.define(cls, 'name', clsName)
			break
		}
		this.define(cls, ns, () => {
			return this.load(classes).then(fn)
		})
		this.include = cls
	}

	/**
	 * @description Classes load method
	 * @param {array} clsNames - File collection to load
	 * @returns Promise
	 */
	load(clsNames) {
		return new Promise(resolve => {
			let collection = []
			Object.keys(clsNames).forEach(i => {
				let cls = clsNames[i].match(/\//) ? clsNames[i].split('/').pop() : [clsNames[i]]
				switch(this.include.has(cls)) {
					case true:
						collection[cls] = this.include.get(cls)
						i == clsNames.length - 1 && resolve(collection)
					break
					default:
						let head = document.querySelector('HEAD')
						let script = document.createElement('SCRIPT')
						script.type = 'text/javascript'
						script.src = clsNames[i] + '.js'
						script.onload = e => {
							collection[cls] = this.include.get(cls)
							i == clsNames.length - 1 && resolve(collection)
						}
						script.onerror = e => console.log(`Filename ${clsNames[i]}.js does not exist!`)
						head.insertBefore(script, head.children[head.children.length - 1])
					break
				}
			})
		})
	}

	/**
	 * @description Define object property
	 * @param {object} obj - Object to set property to
	 * @param {string} prop - Property name
	 * @param {object} val - Promised class
	 * @returns void
	 */
	define(obj, prop, val) {
		Object.defineProperty(obj, prop, {
			value: val
		})
	}

}

Object.defineProperty(window, document.querySelector('[app-load]').getAttribute('instance'), {
	value: new loader
})




