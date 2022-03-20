import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { useGetuserSettingQuery, useSetUserSettingsMutation } from "../../Redux/Services/FetchApi";

export function ImageUploadReact() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const sendgetuserSettingResponseInfo = useGetuserSettingQuery();

  const [setUserSettings, setUserSettingsResponseInfo] =
    useSetUserSettingsMutation();

  useEffect(() => {
    if (sendgetuserSettingResponseInfo.isSuccess) {
      if (sendgetuserSettingResponseInfo.data.results) {
        setImages([
          {
            data_url: sendgetuserSettingResponseInfo.data.results[0].profilepicture,
          },
        ]);
      }
    }
  }, [sendgetuserSettingResponseInfo]);

  const onChange = (imageList, addUpdateIndex) => {
    if (imageList[0]) {
      setUserSettings({
        id: sendgetuserSettingResponseInfo.data.results[0].id,
        data: {
          profilepicture: imageList[0].data_url,
        },
      });
    } else {
      setUserSettings({
        id: sendgetuserSettingResponseInfo.data.results[0].id,
        data: {
          profilepicture: "",
        },
      });
    }
  };
  return (
    <div className="App">
      <ImageUploading
        // multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            {/* <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))} */}
            <Avatar alt="Remy Sharp" src={images[0]?.data_url} />
            <div className="userAdmin-Settings-avatar-button">
              {images.length > 0 ? (
                <>
                  <button onClick={() => onImageUpdate(0)}>Update</button>
                  <button onClick={() => onImageRemove(0)}>Remove</button>
                </>
              ) : (
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload
                </button>
              )}

              <p>Your file must be less than 25MB</p>
            </div>
            &nbsp;
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
