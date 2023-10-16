import React from "react";
import AdminTable from '../components/admin/AdminTable';
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

//Show a tab switcher and the table for that tab
export default function AdminPage() {
  const [selected, setSelected] : any = React.useState("articles");

  return (
    <div className="flex w-full flex-col z-0">
    <Tabs 
      aria-label="Collections"         
      selectedKey={selected}
      onSelectionChange={setSelected}
      id="collection-switcher"
    >
      <Tab key="articles" title="Articles">
        <Card>
          <CardBody>
            <AdminTable collection={'articles'} />
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="modArticles" title="Awaiting Moderation">
        <Card>
          <CardBody>
            <AdminTable collection={'modArticles'} />
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="analystArticles" title="Awaiting Analysis">
        <Card>
          <CardBody>
            <AdminTable collection={'analystArticles'} />
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="rejectedArticles" title="Rejected">
        <Card>
          <CardBody>
            <AdminTable collection={'rejectedArticles'} />
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="tags" title="Tags">
        <Card>
          <CardBody>
            <AdminTable collection={'tags'} />
          </CardBody>
        </Card>  
      </Tab>
    </Tabs>
  </div>  
  );
}