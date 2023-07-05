import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

interface IDestinationImagesProps {
  register: any;
  setImagesList: any;
}

const DestinationImages: React.FunctionComponent<IDestinationImagesProps> = ({
  register,
  setImagesList,
}) => {
  const [images, setImages] = React.useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Images selected...");

    console.dir(e);

    let fileArr = e?.target?.files ? e?.target?.files : [];

    setImagesList(fileArr);
    for (const file of fileArr) {
      const fr = new FileReader();

      fr.addEventListener("load", () => {
        if (images?.length < 10) {
          setImages((images) => {
            const arr = [...images, fr.result as string];

            return arr.slice(0, 10);
          });
        }
      });

      if (file) fr.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Grid container spacing={1}>
        {Array.isArray(images) &&
          images?.map((img, i) => (
            <Grid item xs={2}>
              <img
                style={{
                  width: "100%",
                  height: 200,
                  border: "1px solid #9999",
                }}
                src={img}
              />
            </Grid>
          ))}
        {images?.length < 10 && (
          <Grid item xs={2}>
            <label htmlFor="images">
              <img
                style={{
                  width: "100%",
                  height: 200,
                  border: "1px solid #9999",
                  cursor: "pointer",
                }}
                src={
                  "https://cdn.pixabay.com/photo/2017/11/10/05/42/folder-2935512__340.png"
                }
              />
            </label>

            <input
              style={{ display: "none" }}
              type="file"
              id="images"
              {...register("images")}
              multiple
              onChange={handleImageChange}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DestinationImages;
