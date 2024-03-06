import cn from './SideMenu.module.css';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem } from '@mui/material';
import { DeleteModal } from './DeleteModal/DeleteModal.tsx';

export const SideMenu = ({ accountId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const deleteAccount = useStoreEffect((store: any) => store.accounts.deleteAccount);
  const navigate = useNavigate();

  const openModal = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => {
    deleteAccount({ accountId, navigate });
    setOpen(false);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={cn.sideMenu}>
        <button className={cn.sideMenuButton} onClick={openMenu}>
          <MoreVertOutlinedIcon className={cn.icon} />
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={openModal}>Remove</MenuItem>
        </Menu>
      </div>
      {isOpen && <DeleteModal isOpen={isOpen} closeModal={closeModal} remove={remove} />}
    </>
  );
};
