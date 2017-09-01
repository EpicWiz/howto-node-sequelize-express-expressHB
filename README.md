#**node.js, Sequelize, Express, Express-Handlebars**
###A jump start to getting your node.js app working from top to bottom.

This guide assumes you have some basic grasp of the building blocks of a website. At this point you should have prepared your favorite text or code editor. I personally use [Atom](https://atom.io/), but anything similar works fine. On the other hand, in order to really get the most out of it, you would be better off already having a foundation in **HTML**, **CSS**, **JavaScript**, and an understanding of **relational databases**.

##Contents

###1. [Getting Set Up](#Getting Set Up) - (installations)


##Getting Set Up
The following is the easiest way that I've found to get everything working on a mac. If you aren't using a mac, or if the steps listed are somehow not working for you, please visit the reference links for more information.

###Get Homebrew (macOS only)
Homebrew is a package manager for macOS. This means you can use it to install a lot more useful things far more easily that through alternative means.

First you'll have to open up your terminal.

_Press `CMD` + `Space` to pull up spotlight._

Then go ahead and type the following into your terminal and press `Enter`:

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

This will get **Homebrew** installed on your machine. It should look something like the following...

[HB Install 1](./RMimages/1.png)
[HB Install 2](./RMimages/2.png)
[HB Install 3](./RMimages/3.png)
[HB Install 4](./RMimages/4.png)

Next type `brew --version` into the console.
It should return something that looks like...
`Homebrew 1.3.1`
`Homebrew/homebrew-core (git revision 22df; last commit 2017-09-01)`

**Homebrew Reference Links**
If you have any problems check out the sites below.

<https://brew.sh/>
<https://github.com/Homebrew/brew/>


###Install MySQL
In order to have persistent data we need a database. Go ahead and use [**Homebrew**](https://brew.sh/) to install MySQL.

Type the following into your terminal and press `Enter`:
`brew install mysql`

**MySQL Reference Link**
<https://www.mysql.com/>

###Install node.js
Node (and the many many packages available to extend its abilities) is how we'll be able to use JavaScript on the back end of our site. Again, use brew to download and install MySQL.

Type the following into your terminal and press `Enter`:
`brew install node`

**node.js Reference Link**
<https://nodejs.org/en/>
