
class main {

	constructor() {
		/*
			we start to load our dependencies into class constructor
			"note we have two types of class dependencies, user class uses load and company class uses preload method"
		*/
		_x.load(['js/company', 'js/user']).then(run => {

			//set your properties
			this.user = new run.user
			//loading more classes from same file needs nested approach with then...finally because of asynchronous loading
			run.company.projects().then(cp => {

				//set your properties
				this.companyProjects = new cp

				//or return value for then...finally

			}).finally(() => {
				
				run.company.addresses().then(ca => {
					
					//set your properties
					this.companyAddresses = new ca

					//at this time dependies are loaded and properties are set so we can proceed with this class methods or whatever
					main.log(this.user.userName)
					main.log(this.companyProjects.projectList)
					main.log(this.companyAddresses.employers())

				})

			})

		})

	}

	static log(data) {

		console.log(data)

	}

}

//include class into loader
_x.include = main

