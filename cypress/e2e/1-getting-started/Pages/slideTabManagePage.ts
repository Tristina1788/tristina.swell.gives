
export class SlideTabManagePage{
    settingBtn = '[ui-sref="app.settings"]';
    slideBtn = '[ui-sref="app.slides"]';
    backgroundBtn = '[ui-sref="app.backgrounds"]';
    addSlideBtn = 'Add Slide';
    gridBtn = 'Grid';
    tableBtn = 'Table';
    createSlideBtn = 'Create slide';
    saveSlideBtn = 'Save changes';
    closeBtn = '.close';
    typeSlideSelect = '[ng-model="selected.type"]';
    titleInput = 'input[name="title"]';
    contentInput = 'textarea[name="title"]';
    autoPlayLabel = 'Autoplay during show : ';
    raisedAmounLabel = 'Display raised amount : ';
    hashTagLabel = 'Display hashtag(s) : ';
    fullScreenLabel = 'Show in fullscreen : ';
    uploadFile = '[uploader="uploader"]';
    slideTitle = '[ng-show="slide.title"]';
    deleteSlideBtn = '[ng-click="deleteElement(slide)"]';
    editSlideBtn = '[ng-click="edit(slide,false)"]';
    sortKeyInput = '[role="spinbutton"]'
    amountTag = '[ng-show="slide.showAmountRaised"]';
    hagTag = '[ng-show="slide.showHashtag"]';
    includeSlide = 'Included in slideshow';
    fullScreen = 'Shown Fullscreen';
    amountTagTB = 'Amount';
    hagTagTB = 'Hashtag';
    includeSlideTB = 'Included';
    fullScreenTB = 'Fullscreen';



    getIframeDocument = () => {
        return cy
        .get('iframe.second-row')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
    getIframeBody = () => {
        // get the document
        return this.getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    } 

    inputSlideForm(type: string, title: string, content: string = '', isAutoPlay: boolean = false, isRaisedAmount: boolean = false, isHagTag: boolean = false, isFullScreen: boolean = false, file: string = '') {
        
        this.getIframeBody().find(this.typeSlideSelect).select(type);
        
        this.getIframeBody().find(this.titleInput).clear();
        if (title != '') {
            this.getIframeBody().find(this.titleInput).type(title);
        }

        if (type == 'Text' && content != '') this.getIframeBody().find(this.contentInput).type(content);

        if(isAutoPlay) 
            this.getIframeBody().find('div').contains(this.autoPlayLabel).next().children('label').click();
        if(isRaisedAmount) 
            this.getIframeBody().find('div').contains(this.raisedAmounLabel).next().children('label').click();
        if(isHagTag)
            this.getIframeBody().find('div').contains(this.hashTagLabel).next().children('label').click();    
        if(isFullScreen)
            this.getIframeBody().find('div').contains(this.fullScreenLabel).next().children('label').click();    
        if(file != '')
            this.getIframeBody().find(this.uploadFile).selectFile(file);

    }

    updateSlideForm(type: string, title: string, content: string = '', isAutoPlay: boolean = false, isRaisedAmount: boolean = false, isHagTag: boolean = false, isFullScreen: boolean = false, num : number) {
        this.getIframeBody().find(this.titleInput).clear({force:true});
        if (title != '') {
            this.getIframeBody().find(this.titleInput).eq(0).type(title);
        }
        if(isAutoPlay) 
            this.getIframeBody().find('div').contains(this.autoPlayLabel).next().children('label').click();
        if(isRaisedAmount) 
            this.getIframeBody().find('div').contains(this.raisedAmounLabel).next().children('label').click();
        if(isHagTag)
            this.getIframeBody().find('div').contains(this.hashTagLabel).next().children('label').click();    
        if(isFullScreen)
            this.getIframeBody().find('div').contains(this.fullScreenLabel).next().children('label').click();    
        this.getIframeBody().find(this.sortKeyInput).eq(0).type(num+'');

    }

    verifyShowImageSlide(title: string) {
        cy.wait(3000);
        this.getIframeBody().find(this.slideTitle).children('a').contains(title).should('be.visible');
    }

    verifyImageSlideIsNotPresent(title: string) {
        cy.wait(3000);
        this.getIframeBody().find('a').contains(title).should('not.exist');
    }
    clickSettingButton() {
        cy.get(this.settingBtn).click();
    }

    clickSlideButton() {
        cy.get(this.slideBtn).click();
    }

    clickBackgroundButton() {
        cy.get(this.backgroundBtn).click();
    }

    clickAddSlideButton() {
        this.getIframeBody().find('button').contains(this.addSlideBtn).click();
    }

    clickGridButton() {
        this.getIframeBody().find('button').contains(this.gridBtn).click();
    }

    clickTableTabButton() {
        this.getIframeBody().find('button').contains(this.tableBtn).click();
    }

    clickCreateSlideButton() {
        this.getIframeBody().find('button').contains(this.createSlideBtn).click();
    }

    clickSaveSlideButton() {
        this.getIframeBody().find('button').contains(this.saveSlideBtn).click();
    }

    clickCloseSlideButton() {
        this.getIframeBody().find(this.closeBtn).click();
    }


    clickDeleteSlideButton(title: string) {
        this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').find(this.deleteSlideBtn).click({force:true});
    }

    clickEditSlideButton(title: string) {
        this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').find(this.editSlideBtn).click({force:true});
    }

    clickDeleteSlideButtonInTableTab(title: string) {
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').find(this.deleteSlideBtn).click({force:true});
    }

    clickEditSlideButtonInTableTab(title: string) {
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').find(this.editSlideBtn).eq(0).click({force:true});
    }
    verifyShowImageSlideInTableTab(title: string) {
        cy.wait(3000);
        this.getIframeBody().find('.list-body').contains(title).should('be.visible');
    }

    verifyShowImageSlideIsNotPresentInTableTab(title: string) {
        cy.wait(3000);
        this.getIframeBody().find('#content').then(($res) => {
            if($res.find('.list-body').length)
                this.getIframeBody().find('.list-body').contains(title).should('not.exist');
            
        });
        
    }

    verifyHaveCorrectPropertiesSlide(title: string, isAutoPlay: boolean = false, isRaisedAmount: boolean = false, isHagTag: boolean = false, isFullScreen: boolean = false){
        if(isRaisedAmount)
            this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').find(this.amountTag).should('be.exist');
        
        if(isHagTag)
            this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').find(this.hagTag).focus().should('be.exist');

        if(isAutoPlay)
        this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').contains(this.includeSlide).should('be.exist');

        if(isFullScreen)
        this.getIframeBody().find('.card-block').contains(title).parentsUntil('.card-block').contains(this.fullScreen).should('be.exist');
    }

    verifyHaveCorrectPropertiesSlideTB(title: string, isAutoPlay: boolean = false, isRaisedAmount: boolean = false, isHagTag: boolean = false, isFullScreen: boolean = false){
        if(isRaisedAmount)
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').contains(this.amountTagTB).should('be.exist');
        
        if(isHagTag)
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').contains(this.hagTagTB).should('be.exist');

        if(isAutoPlay)
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').contains(this.includeSlideTB).should('be.exist');

        if(isFullScreen)
        this.getIframeBody().find('.list-body').contains(title).parent('div').parent('.list-body').contains(this.fullScreenTB).should('be.exist');
    }
}