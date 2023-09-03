import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment
} from "next/navigation";

const useMovePage = () => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const router = useRouter();

  const handleMove = (destination: string) => {
    const pattern = new RegExp(`\\/${segment}(.*)`);
    const match = pathname.match(pattern);
    if (match) {
      const selectedPart = match[0];
      router.push(pathname.replace(selectedPart, `/${destination}`));
    } else {
      router.push(`${pathname}/${destination}`);
    }
  };

  return { segment, pathname, router, handleMove }
}

export default useMovePage