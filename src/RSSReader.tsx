import { h, Properties } from 'hastscript';
import Async from 'react-async';
import type { Plugin } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

const API_ENDPOINT = 'https://api.rss2json.com/v1/api.json?';

const getRss = async({ url }: any) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const parseOptions = (str: string) => {
  try {
    return JSON.parse(str);
  }
  catch (err) {
    return {
      apiKey: null,
    };
  }
};

export const rssReader = (Tag: React.FunctionComponent<any>): React.FunctionComponent<any> => {
  return ({
    children, title, href, ...props
  }) => {
    try {
      if (children === null || children !== 'RSS') {
        return <Tag title={title} href={href} {...props}>{children}</Tag>;
      }
      const { apiKey, count, order } = parseOptions(title);
      const params = new URLSearchParams();
      params.append('rss_url', href);
      if (apiKey) {
        params.append('api_key', apiKey);
        params.append('count', count || '10');
        params.append('order_by', order || 'pubDate');
      }
      const url = `${API_ENDPOINT}${params.toString()}`;
      return (
        <Async promiseFn={getRss} url={url}>
          {({ data, error, isPending }) => {
            if (isPending) return 'Loading...';
            if (error) return `Something went wrong: ${error.message}`;
            if (data) {
              return (
                <>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>PubDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.items || []).map((item: any) => (
                        <tr key={item.guid}>
                          <td><a href={item.link} target='_blank'>{item.title}</a></td>
                          <td>{item.author}</td>
                          <td>{item.pubDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              );
            }
            return null;
          }}
        </Async>
      );
    }
    catch (err) {
      // console.error(err);
    }
    // Return the original component if an error occurs
    return (
      <Tag title={title} href={href} {...props}>{children}</Tag>
    );
  };
};

interface GrowiNode extends Node {
  name: string;
  data: {
    hProperties?: Properties;
    hName?: string;
    hChildren?: Node[] | { type: string, value: string, url?: string }[];
    [key: string]: any;
  };
  type: string;
  attributes: {[key: string]: string}
  children: GrowiNode[] | { type: string, value: string, url?: string }[];
  value: string;
  title?: string;
  url?: string;
}

export const rssReaderPlugin: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'leafDirective', (node: Node) => {
      const n = node as unknown as GrowiNode;
      if (n.name !== 'rss') return;
      const data = n.data || (n.data = {});
      data.hName = 'a';
      data.hChildren = [{ type: 'text', value: 'RSS' }];
      const href = n.children[0].url;
      data.hProperties = {
        href,
        title: JSON.stringify(n.attributes),
      };
    });
  };
};
