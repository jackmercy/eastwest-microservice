import dynamic from 'next/dynamic';

export default dynamic(() => import('./Comments'), { ssr: false });
