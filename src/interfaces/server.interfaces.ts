import { ReadonlyURLSearchParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export interface ServerProps {
   params: Params;
   searchParams: ReadonlyURLSearchParams;
}
