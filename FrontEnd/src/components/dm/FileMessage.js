import React from 'react';
import moment from 'moment';

import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const FileMessage = ({ fileName, url, timeStamp }) => {
  const fileDownload = () => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var a = document.createElement('a');
      var blob = xhr.response;
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      // delete a;
    };
    xhr.open('GET', url);
    xhr.send();
    alert('다운로드가 완료되었습니다.');
  };

  const extensionCheck = () => {
    var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (
      extension.toLowerCase() === 'jpg' ||
      extension.toLowerCase() === 'png'
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {extensionCheck() ? (
        <img
          alt="미리보기"
          src={url}
          onClick={fileDownload}
          width="100%"
          height="100%"
        ></img>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '0.8rem',
          }}
        >
          <Grid item xs={2}>
            <VerticalAlignBottomIcon
              onClick={fileDownload}
              style={{ width: '100%', height: '50%' }}
            />
          </Grid>

          <Grid item xs={1}></Grid>

          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item xs={6} style={{ maxWidth: '95%' }}>
                <Typography
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <b>{fileName}</b>
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ maxWidth: '95%' }}>
                <Typography variant="caption">
                  유효기간: ~
                  {moment(timeStamp)
                    .add(1, 'months')
                    .format('YYYY/MM/DD')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FileMessage;
