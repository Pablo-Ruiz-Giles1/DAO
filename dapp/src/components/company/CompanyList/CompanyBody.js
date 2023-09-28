import { drizzleReactHooks } from '@drizzle/react-plugin'
import CompanyRow from "./CompanyRow";

const { useDrizzle } = drizzleReactHooks;
const CompanysBody = () => {
    const { useCacheCall } = useDrizzle();
    const getCompanyLength = useCacheCall("Traductores", "getCompanyLength") || 0;
    let rows = [];
    for (let i = 0; i < getCompanyLength; i++) {
        rows.push(<CompanyRow key={"ab-" + i} CompanyIndex={i} />);
    }
    return <tbody>{rows}</tbody>;
};
export default CompanysBody;