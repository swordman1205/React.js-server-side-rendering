import React, {Component} from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

@withRouter

class Html extends Component {
    render() {
        return [
            `<!DOCTYPE html>`,
            <html lang="en">
                <head>
                    <meta charset="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0"/>
                    <meta name="description" content=""/>
                    <meta name="author" content=""/>


                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#da532c"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <link href="/src/styles/montserrat.css" rel="stylesheet"/>
                    <link href="/src/styles/angelina.css" rel="stylesheet"/>
                    <link href="/src/styles/Flaticons.css" rel="stylesheet"/>

                    <title>Nuevas Evas</title>
                </head>
            <body>
                <div id="app"></div>
                <script src="/static/bundle.js"></script>
            </body>
            </html>
    ]
    }
}

export default Html;
