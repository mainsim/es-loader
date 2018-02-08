
class main {

	constructor() {

		/*
			we start to load our dependencies into class constructor
			"note we have two types of class dependencies, user class uses load and company class uses preload method"
		*/
		_x.load(['js/company', 'js/user']).then(run => {

			//set your properties
			this.user = new run.get('user')

			//loading more classes from same file needs nested approach with then...finally because of asynchronous loading
			run.company.projects().then(run_cp => {

				//set your properties
				this.companyProjects = new run_cp

				//or return value for then...finally

			}).finally(() => {
				
				run.company.addresses().then(run_ca => {
					
					//set your properties
					this.companyAddresses = new run_ca

					//at this time dependies are loaded and properties are set so we can proceed with this class methods or whatever
					this.log(this.user.userName)
					this.log(this.companyProjects.projectList)
					this.log(this.companyAddresses.employers())

				})

			})

		})

	}

	log(data) {

		console.log(data)

	}

}

//include class into loader
_x.include = main

