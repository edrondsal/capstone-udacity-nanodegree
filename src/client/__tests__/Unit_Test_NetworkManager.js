/*--------------------------------------------------------
Unit Test for the NetworkManager code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 15/06/20
last modified: 15/06/20
Updates:
15/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/

import 'regenerator-runtime/runtime'
import { getData, postData } from '../js/NetworkManager.js'

describe("Unit Test for the Network Manager", () => {

    test("Test for getData function", () => {

      getData('https://jsonplaceholder.typicode.com/posts/1').then(response =>{
          
        const stringJSON = `{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          }`;
        let jsonRes = JSON.stringify(response);  
        expect(jsonRes).toEqual(stringJSON);
      });
    });

    test("test for postDate function", () => {
        const data = {
            title: 'foo',
            body: 'bar',
            userId: 1
          };
        postData('https://jsonplaceholder.typicode.com/posts',data).then(response => {
            const stringJSON = `{
                id: 101,
                title: 'foo',
                body: 'bar',
                userId: 1
              }`;
              let jsonRes = JSON.stringify(response);
              expect(jsonRes).toEqual(stringJSON);
          });   
    });


});