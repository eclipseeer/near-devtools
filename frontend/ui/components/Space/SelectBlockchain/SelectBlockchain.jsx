import { Link } from 'react-router-dom';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  return (
    <div className={cn.container}>
      <h1>Select Blockchain</h1>
      <Link to="../near-protocol/networks" relative="path">Near Protocol</Link>
    </div>
  );
};