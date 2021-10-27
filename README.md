# Implementation of basic Node.js application to handle file uploads and serve content.

### How to use:
1. Ensure that you have nvm
2. Run `nvm use`
3. Install dependencies by using `yarn`
4. Run app `yarn start`

### Test
curl --location --request POST 'http://localhost:3000/api/upload' --form 'image=@"HERE PUT YOU PATH TO FILE"'

as the result you will get next response:

```
{
    file: `/FILENAME`,
    thumbnail: `/thumbnails/FILENAME`,
}
```
