/**
 * @description Javascript asynchronous class loader
 * @version 1.0
 * @author Macolic Sven <macolic.sven@gmail.com>
 *
 * @license 
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
		window.onload = e => {
			let main = document.querySelector('[load]').getAttribute('load')
			this.load([main]).then(run => {
				new run[loader.parseClass(main)]
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
	 * @description Preload class collection
	 * @param {string} clsName - Class name
	 * @param {string} ns - Class namespace
	 * @param {array} classes - File names for loading
	 * @param {function} fn - Function containing promised class
	 * @returns void
	 */
	preload(clsName, ns, classes, fn) {
		let cls 
		if(this.include.has(clsName)) {
			cls = this.include.get(clsName)				
		} else {
			cls = {}
			loader.define(cls, 'name', clsName)
		}
		loader.define(cls, ns, () => {
			return this.load(classes).then(fn)
		})
		this.include = cls
	}

	/**
	 * @description Classes load method
	 * @param {array} clsNames - Load class collection
	 * @returns Promise
	 */
	load(clsNames) {
		return new Promise(resolve => {
			let collection = []
			Object.keys(clsNames).forEach(i => {
				let cls = loader.parseClass(clsNames[i])
				if(this.include.has(cls)) {
					collection[cls] = this.include.get(cls)
					Number(i) === clsNames.length - 1 && resolve(collection)
				} else {
					let script = document.createElement('SCRIPT')
					script.setAttribute('src', clsNames[i]+'.js')
					script.onload = e => {
						collection[cls] = this.include.get(cls)
						Number(i) === clsNames.length - 1 && resolve(collection)
					}
					script.onerror = e => console.log(`Filename ${clsNames[i]}.js does not exist!`)
                    document.querySelector('HEAD').insertAdjacentElement('beforeend', script)
				}
			})
		})
	}

	/**
	 * @description Define object property
	 * @param {object} obj - Object to set property to
	 * @param {string} prop - Property name
	 * @param {function} val - Promised class
	 * @returns void
	 */
    static define(obj, prop, val) {
		Object.defineProperty(obj, prop, {
			value: val
		})
	}
	
	/**
	 * @description Parse class source
	 * @param {string} src - Class sorce to parse
	 * @returns array
	 */
	static parseClass(src) {
		return src.match(/^.*\/(.*)$/)[1]
	}

}

loader.define(window, document.querySelector('[load]').getAttribute('instance'), new loader)




