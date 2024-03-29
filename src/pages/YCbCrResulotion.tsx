import React, { useEffect, useState } from "react";
import {
  Slider,
  Chip,
  Container,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import { baseURL } from "../configs/network/consts";
const RGBDecomposition = () => {
  const [colorValues, setColorValues] = useState({ y: 1, cb: 1, cr: 1 });
  const [imagesSrc, setImagesSrc] = useState({ Y: '', Cb: '', Cr: '', Merge: '' });
  const [disabled, setDisabled] = useState(false);


  const submit = async () => {
    setDisabled(true);
    await fetch(baseURL + '/source_coding/YCbCr_downsample/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(colorValues)
    }).then((res) => res.json())
      .then((res) => {
        setImagesSrc(res);
        setDisabled(false);
      })
      .catch(() => {
        setDisabled(false);
      })
  }

  useEffect(() => {
    submit();
  }, [])

  return (
    <Container sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Stack sx={{ width: '100%' }} >
        <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
          <Stack>
            <Stack>
              <img alt='' src={imagesSrc.Y} width={100} />
              <Slider
                value={colorValues.y * 100}
                onChange={e => {
                  setColorValues({
                    ...colorValues,
                    y: (e.target as any).value / 100,
                  });
                }} />
            </Stack>
            <Stack>
              <img alt='' src={imagesSrc.Cb} width={100} />
              <Slider
                value={colorValues.cb * 100}
                onChange={e => {
                  setColorValues({
                    ...colorValues,
                    cb: (e.target as any).value / 100,
                  });
                }} />
            </Stack>
            <Stack>
              <img alt='' src={imagesSrc.Cr} width={100} />
              <Slider
                value={colorValues.cr * 100}
                onChange={e => {
                  setColorValues({
                    ...colorValues,
                    cr: (e.target as any).value / 100,
                  });
                }} />
            </Stack>
          </Stack>
          <Stack alignItems='center' spacing={1}>
            <Stack>
              <img alt='' src='cat.jpg' width={100} />
            </Stack>
            <Stack>
              <img alt='' src='down-arrow.png' width={50} />
            </Stack>
            <Stack>
              <img alt='' src={imagesSrc.Merge} width={100} />
            </Stack>
          </Stack>
        </Stack>
        <Button disabled={disabled} variant="contained" onClick={submit}>
          {disabled ?
            <CircularProgress /> :
            'اعمال'
          }
        </Button>
      </Stack>
    </Container>
  );
}

export default RGBDecomposition;
