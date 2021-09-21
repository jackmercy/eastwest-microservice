import dynamic from 'next/dynamic';

export default dynamic(() => import('./Careers'), { ssr: false });
