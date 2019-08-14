import ImageResizer from 'react-native-image-resizer';
import fs from 'react-native-fs';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export function pickPhoto(successCallback, failureCallback, mediaType = 'photo') {
  ImagePicker.openCamera({
    width: 300,
    height: 300,
    includeBase64: true,
    includeExif: true,
    mediaType
  }).then(async image => {
    const base64Data = await fs.readFile(image.path, 'base64');
    successCallback({
      uri: image.path,
      base64: base64Data
    });
  });
}
// ImagePicker.showImagePicker(options, response => {
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   } else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//     failureCallback(response.error);
//   } else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//   } else {
//     //   const source = { uri: `data:image/jpeg;base64,${response.data}` };
//     //   this.setState({ avatar: `data:image/jpeg;base64,${response.data}` });
//     //   console.log('RESPONSE IMAGE', response);
//     //   this.setState({
//     //     filePath: source
//     //   });
//     console.log('Response = ', response);
//     ImageResizer.createResizedImage(response.uri, 135, 135, 'JPEG', 100,0)
//       .then(async resizeResponse => {
//         // response.uri is the URI of the new image that can now be displayed, uploaded...
//         // response.path is the path of the new image
//         // response.name is the name of the new image with the extension
//         // response.size is the size of the new image
//         const base64Data = await fs.readFile(resizeResponse.path, 'base64');
//         successCallback({
//           uri: resizeResponse.uri,
//           base64: base64Data
//         });
//       })
//       .catch(err => {
//         // Oops, something went wrong. Check that the filename is correct and
//         // inspect err to get more details.
//         console.log('Error RESIZE++++++>: ', err);
//       });
//   }
// });
// }
