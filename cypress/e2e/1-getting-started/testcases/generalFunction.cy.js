import { match } from "assert";

    export function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    export function getRandomNumber() {
        var text = "";
        var possible = "0123456789";
    
        for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    export function getRandomEmail(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm +dd + yyyy;
        return makeid()+today+'@gmail.com';
    }

    export function getRandomText(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    export function getCurrentDateTime(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return dd +"/"+ mm + "/" + yyyy;
    }

    export function getCurrentTime(){
        var today = new Date();
        var hour = String(today.getHours());
        var min = String(today.getMinutes()); //January is 0!

        return hour +':'+ min;
    }

    export function getRandomLocation(){
        const locations = ["NewYour", "Chicago", "Denver", "Los Angeles", "Kentucky"];
        var randomNum = Math.floor(Math.random() * 5);
        return locations[randomNum];
    }
