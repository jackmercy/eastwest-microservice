import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

import { SEO, StaticHTML } from '../../components';
import { useOnClickOutside } from '../../hooks';
import { Layout, Header, Footer, Content } from '../components';
import ListRankings from '../NewsAndMedia/ListRankings';
import { apiUtil, storageUtil } from '../../utils';
import { API_ENDPOINT, LANDING_PAGE_DOMAIN } from '../../../configs';

import Breadcrumb from './Breadcrumb';
import Comments from './Comments';
import useStyles from './newsAndMediaDetails.styles';

const NewsAndMediaDetails = ({ data, categories, listRankings, comments }) => {
  let { shares } = data;
  const intl = useIntl();
  const router = useRouter();
  const classes = useStyles();
  const sharingRef = useRef();
  const [openSharing, setOpenSharing] = useState(false);
  const category = useMemo(
    () => categories.find((c) => c.id === data.category),
    [categories, data],
  );
  const seo = useMemo(
    () => ({
      title: data?.title,
      image: data?.thumbnail
        ? `${API_ENDPOINT}/files/public/${data.thumbnail}`
        : '',
      description: data?.shortDescription,
      url: `${LANDING_PAGE_DOMAIN}/${router.asPath}`,
      keywords: data?.tags ? data.tags.join(', ') : undefined,
    }),
    [data, router],
  );
  const breadcrumb = useMemo(
    () => [
      {
        label: intl.formatMessage({ id: 'NEWS.TITLE' }),
        href: '/news-and-media',
      },
      {
        label: category?.name,
        href: category?.slug
          ? `/news-and-media/${category.slug}`
          : '/news-and-media',
      },
      { label: data.title },
    ],
    [intl, data, category],
  );
  const socials = useMemo(
    () => [
      {
        key: 'facecbook',
        label: 'Facebook',
        icon: 'icon-facebook',
        component: FacebookShareButton,
        props: { url: seo.url, quote: seo.title },
      },
      {
        key: 'twitter',
        label: 'Twitter',
        icon: 'icon-twitter',
        component: TwitterShareButton,
        props: { url: seo.url, title: seo.title, hashtags: data.tags },
      },
      {
        key: 'linkedin',
        label: 'Linkedin',
        icon: 'icon-linkedin',
        component: LinkedinShareButton,
        props: { url: seo.url, title: seo.title, summary: seo.description },
      },
    ],
    [seo, data],
  );
  const authorImageUrl = useMemo(
    () =>
      data?.author?.avatar
        ? `${API_ENDPOINT}/files/public/${data.author.avatar}`
        : '/static/images/logo/east-west-no-text.svg',
    [data],
  );

  useEffect(() => {
    const newViewed = JSON.parse(storageUtil.getNewsViewed() || null) || [];
    if (newViewed.indexOf(data.id) === -1) {
      apiUtil.news
        .updatePublicNews(data.id, { ...data, views: data.views + 1 })
        .then(() => {
          newViewed.push(data.id);
          storageUtil.setNewsViewed(JSON.stringify(newViewed));
        })
        .catch(console.log);
    }
  }, [data]);

  const formatCreatedDate = useCallback((value) => {
    const date = new Date(value);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return [
      date.getDate(),
      `${months[date.getMonth()]},`,
      date.getFullYear(),
    ].join(' ');
  }, []);

  const formatUpdatedDate = useCallback(
    (updatedDate) => {
      const intervals = [
        {
          label: intl.formatMessage({ id: 'DATE.YEAR' }),
          labelPlural: intl.formatMessage({ id: 'DATE.YEAR.PLURAL' }),
          seconds: 31536000,
        },
        {
          label: intl.formatMessage({ id: 'DATE.MONTH' }),
          labelPlural: intl.formatMessage({ id: 'DATE.MONTH.PLURAL' }),
          seconds: 2592000,
        },
        {
          label: intl.formatMessage({ id: 'DATE.DAY' }),
          labelPlural: intl.formatMessage({ id: 'DATE.DAY.PLURAL' }),
          seconds: 86400,
        },
        {
          label: intl.formatMessage({ id: 'DATE.HOUR' }),
          labelPlural: intl.formatMessage({ id: 'DATE.HOUR.PLURAL' }),
          seconds: 3600,
        },
        {
          label: intl.formatMessage({ id: 'DATE.MINUTE' }),
          labelPlural: intl.formatMessage({ id: 'DATE.MINUTE.PLURAL' }),
          seconds: 60,
        },
        {
          label: intl.formatMessage({ id: 'DATE.SECOND' }),
          labelPlural: intl.formatMessage({ id: 'DATE.SECOND.PLURAL' }),
          seconds: 1,
        },
        {
          label: intl.formatMessage({ id: 'DATE.NOW' }),
          labelPlural: intl.formatMessage({ id: 'DATE.NOW' }),
          seconds: 0,
        },
      ];

      const seconds = Math.floor(
        (Date.now() - new Date(updatedDate).getTime()) / 1000,
      );
      const interval = intervals.find((i) => i.seconds <= seconds);
      const number = interval.seconds
        ? Math.floor(seconds / interval.seconds)
        : interval.seconds;

      return number
        ? intl.formatMessage(
          { id: 'NEWS.DETAILS.COMMENT.LAST_UPDATED' },
          {
            number,
            timing: number !== 1 ? interval.labelPlural : interval.label,
          },
        )
        : interval.label;
    },
    [intl],
  );

  useOnClickOutside(sharingRef, () => {
    setOpenSharing(false);
  });

  const toggleSharingPopup = useCallback(() => {
    setOpenSharing(!openSharing);
  }, [openSharing]);

  const handleShareWindowClose = useCallback(() => {
    // Currently we cannot detect window closed after user shared or canceled
    // Because we are sharing with annonymous user
    // So we will count after everytime share dialog closed
    apiUtil.news
      .updatePublicNews(data.id, { ...data, shares: shares + 1 })
      .then((res) => {
        shares = res.shares;
      })
      .catch(console.log);
  }, [data, shares]);

  return (
    <Layout>
      <SEO {...seo} />
      <Header />
      <Breadcrumb paths={breadcrumb} />
      <Content className={classes.content}>
        <p className={classes.category} data-test="news-details-category">
          {category?.name}
        </p>
        <h1 className={classes.title} data-test="news-details-title">
          {data.title}
        </h1>
        <div className={classes.summary}>
          <div className={classes.author}>
            <div className={classes.authorImageWrapper}>
              <a href={authorImageUrl} target="_blank" rel="noreferrer">
                <img
                  alt="author"
                  className={classes.authorImage}
                  data-test="news-details-author-image"
                  src={authorImageUrl}
                />
              </a>
            </div>
            <div className={classes.authorInfo}>
              <p
                className={classes.authorName}
                data-test="news-details-author-name"
              >
                {`${data?.author?.firstName} ${data?.author?.lastName}`}
              </p>
              <p
                className={classes.lastUpdated}
                data-test="news-details-updated-time"
              >
                {formatCreatedDate(data.createdAt)}&nbsp;
                {formatUpdatedDate(data.updatedAt)}
              </p>
            </div>
          </div>
          <div
            className={classes.sharing}
            data-test="news-details-socials-sharing"
          >
            <p className={classes.sharingLabel}>
              {intl.formatMessage({ id: 'NEWS.DETAILS.SHARE' })}
            </p>
            <div
              ref={sharingRef}
              role="presentation"
              onClick={toggleSharingPopup}
              className={classes.sharingIcon}
            >
              <i className="icon-share" />
              {openSharing ? (
                <ul className={classes.sharingPopup}>
                  {socials.map((item) => (
                    <li key={item.key} className={classes.sharingPopupItem}>
                      <item.component
                        {...item.props}
                        className={classes.sharingPopupLink}
                        onShareWindowClose={handleShareWindowClose}
                      >
                        <span className={classes.sharingPopupIcon}>
                          <i className={item.icon} />
                        </span>
                        {item.label}
                      </item.component>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.thumbnailWrapper}>
          <img
            alt={data.title}
            className={classes.thumbnail}
            data-test="news-details-thumbnail"
            loading="lazy"
            src={seo.image}
          />
        </div>
        <ListRankings
          data={listRankings}
          categories={categories}
          className={classes.listRankings}
        />
        <div
          className={classNames('ck-content', classes.newsContent)}
          data-test="news-details-content"
        >
          <StaticHTML stringHtml={data.htmlContent} />
        </div>
        <Comments
          newsId={data.id}
          data={comments}
          className={classes.comments}
        />
      </Content>
      <Footer />
    </Layout>
  );
};
NewsAndMediaDetails.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    htmlContent: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  listRankings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      parent: PropTypes.string,
      news: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};
NewsAndMediaDetails.defaultProps = {
  data: undefined,
  categories: [],
  listRankings: [],
  comments: [],
};

export default memo(NewsAndMediaDetails);
