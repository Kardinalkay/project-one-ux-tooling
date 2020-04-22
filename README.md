# PROJECT: UX TOOLING
**CREATING DROP-IN UI COMPONENTS AND TOOLS TO IMPROVE THE USER EXPERIENCE OF AN ARTICLE**

---

## Overview

The aim of this project is to enhance the functionality, experiment with new or scarcely used methods and improve the overall user experience for a typical 'article' page.


## Setup

An article page would be built with HTML and CSS which is at least 5 times longer than the height of the user agent's viewport.


## General Guide


### Objective 1: Scroll progress indicator

**Goal:** A visual progress indicator will be created to give user estimate on his progress on an the article.
	Bonus: 1. Mark indicator at 80% upwards to alert user he is close to completion.
		   2. Make this indicator animated with a simple styling trick.
		   3. Create a short horizontal slider right under the indicator that makes for vertical page scroll easy. If the page scroll is jumpy, 
		   	  scroll would be done in chunks or by viewport height (as if the space bar was hit). If this tricky feature does not turn out well or 
		   	  play nice with other browsers, it will be pulled.

### Objective 2: Progress title

**Goal:** The main title of the document is to remain in view at all times.
	Bonus: 1. The article in this project will contain sub-topics and once a sub-topic heading is out of view, it will flash for every 5 minutes
			  the user is absent-minded.

### Objective 3: Word count

**Goal:** Average reading time to be counted. 
	Bonus: 1. There is the average reading speed; however there are users who categorise themselves as fast or slow readers. Application will compute
			  reading time estimate for the fast, slow and average reader.

### Objective 4: Scroll Spy

**Goal:** Method will be designed to represent user's progress through the long article, such that they can easily view the article's outline 
		  and move a desired portion of the document into the viewport at any time.  

### Objective 5: Content reveal (accordion)

**Goal:** A component will be designed to guide a user through content that is split into multiple parts. Content of article will be made deliberately 
		  long to accomplish this task.

### Objective 6: Scroll-up button (accordion)

**Goal:** As a result of creating a long article page, a scrollup button is ideal to enhance user experience; saving time to navigate to either top
		  or bottom of document.
	Bonus : 1. Create a unique scroll-up button that scrolls to middle of page, then mutates into two: any click on either of these buttons will take
			user to either top or bottom of the page and re-squash into one.

### Objective 7: New content engagement (aka, "infinite" content)

**Goal:** When a user reaches the bottom of a document, maintain the fluidity of the experience and engagement by loading new content. Application to 
		 ensure user experiences no nasty surprise by providing hint that fresh content is coming by way of a spinning loader (a simple gif image) 
		 combined with the help of fading text.

