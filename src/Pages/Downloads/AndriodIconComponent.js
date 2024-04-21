import React from 'react';
import { green , pink} from '@mui/material/colors';
import AdbIcon from '@mui/icons-material/Adb';
import Checkbox from '@mui/material/Checkbox';

const AndriodIconComponent = ({ checked, onChange }) => {
  return (
    <label>
      <Checkbox
        icon={<AdbIcon style={{ color: 'green', fontSize: 50 }} />}
        checkedIcon={<AdbIcon style={{  color:  pink[600], fontSize: 50 }} />}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

export default  AndriodIconComponent;
