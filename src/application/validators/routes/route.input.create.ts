export type IRoutesInputCreate = {
  route_path: string;
  project_id: string;
  user_id: string;
  data_builder_types: string;
  route_type: string;
  schema: {
    content: string;
  };
};

export type IRoutesInputEdit = IRoutesInputCreate & {
  route_id: string;
};
