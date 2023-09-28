import { drizzleReactHooks } from '@drizzle/react-plugin'
import TraductorRow from "./TraductorRow";

const { useDrizzle } = drizzleReactHooks;
const TraductorBody = () => {
    const { useCacheCall } = useDrizzle();
    const getTraductorLength = useCacheCall("Traductores", "getTraductorLength") || 0;
    let rows = [];
    for (let i = 0; i < getTraductorLength; i++) {
        rows.push(<TraductorRow key={"ab-" + i} TraductorIndex={i} />);
    }
    return <tbody>{rows}</tbody>;
};
export default TraductorBody;