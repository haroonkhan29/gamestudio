import React from 'react';
import { green , pink} from '@mui/material/colors';
import AppleIcon from '@mui/icons-material/Apple';
import Checkbox from '@mui/material/Checkbox';

const AppleIconComponent = ({ checked, onChange }) => {
  return (
    <label>
      <Checkbox
        icon={<AppleIcon style={{ color: 'red', fontSize: 50 }} />}
        checkedIcon={<AppleIcon style={{ color:  pink[600], fontSize: 50 }} />}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

export default AppleIconComponent;
