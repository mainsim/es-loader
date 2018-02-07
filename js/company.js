
/*
	we start to preload our dependencies so we can extend abstract classes
	"note that on preload we dont need to include class into loader"

	_x.preload filename, class namespace, files to include, class playground
*/

_x.preload('company', 'projects', ['js/user', 'js/tasks'], run => {

	return class projects extends run.tasks {

		constructor() {

			//we call superclass to extend it
			super()

			//set your properties 
			let user = new run.user
			this.projectList = this.taskData(user.userName)

			//proceed with class methods or whatever

		}

	}

})

_x.preload('company', 'addresses', ['js/user'], run => { 

	return class addresses extends run.user {

		constructor() {

			//we call superclass to extend it
			super()

			//take heritage from abstract and set your properties 
			this.employers = this.userList

			//proceed with class methods or whatever

		}

	}

})



