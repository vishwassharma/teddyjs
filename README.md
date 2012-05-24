# How to bootstrap

## On Ubuntu

###1. Before that make sure that you dont have any ruby package installed on your system

    
        sudo apt-get purge ruby
        sudo apt-get purge ruby-gems
        sudo apt-get purge ruby1.9.3


###2. Install RVM package

Go to the [this](https://rvm.io/rvm/install/) site where you will find the installation instruction for rvm installation

###3. Install Ruby1.9.3
If ruby is not installed then do this


    rvm install 1.9.3


else do this


    rvm use 1.9.3

if you want to make your ruby version the default version then 


    rvm use 1.9.3 --default

###4. Install rubygems

Go to [this](http://rubygems.org/pages/download) site and install ruby gem using manual installation instructions


###5. Install jasmine, guard, guard plugins (livereload, coffeescript, compass, jasmine-headless-webkit)


    gem install jasmine  
    gem install guard  
    gem install guard-livereload  
    gem install guard-coffeescript  
    gem install guard-compass  


Install Jasmine-headless-webkit


    gem install guard-jasmine-headless-webkit

After it has been installed then get the browser plugin from [here](http://help.livereload.com/kb/general-use/browser-extensions)

###6. Initialize for live reload
After installing all these packages create a directory where you want to work
    

    mkdir <workspace/project_dir>
    guard init

and then edit the new Guard file with [this](https://raw.github.com/gist/2761000/3c2be9e0f5c6db1e8afe04e9d69647861e8f18fb/GuardFile)

###7. Install node packages


Use the template package [here](https://raw.github.com/gist/2760824/c6da5e423756836676659c8b14237e40b73c9147/package.json)

    
or use this


    git clone git://gist.github.com/2760824.git gist-2760824
    
and then run

    
    npm install

to initialize the packages required

###8. After doing this you can start guard


    guard


Now all the changes will be monitered by the browser automatically


# Running application
Watch over these files
        
        supervisor -w models,libs,routes,app.coffee app.coffee
