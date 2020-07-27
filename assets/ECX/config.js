var Config = {
    fakeUpload: false,
    cmsRootPath: '',
    //site url  https://trydcm.eccentex.com/Ecx.Web?appid=ROOT_CASEMANAGEMENT&d=DCM_TRAINING_PRODUCTION.TENANT82
    siteUrl:   'https://trydcm.eccentex.com/',
    //from url d={#}
    appBaseDomain: 'DCM_PRODUCTION.TENANT82',
    //Config.TOKEN_SYSTEMDOMAIN
    appBaseTokenSystemDomain: 'config.tenant82',
//  Rules
    caseCreateRule     : 'root_MDM_CreateCaseWithDataFn',
    caseGetTypesRule   : 'root_STP_getCaseTypes',
    caseSearchRule     : 'root_DCM_SearchCases',
    ExtPartySearchRule : 'ROOT_CUST_GETEXTPARTYDATA',
//  Functions 
    getCookieTokenName: function() {
        return this.appBaseDomain + '_appbaseusertoken'
    },

    getCookieLoginName: function() {
        return this.appBaseDomain + '_appbaseuserlogin'
    },
    // This function returns params for open case detail page
    getCaseDetailPageParams: function() {
        return 'app=CaseDetailRuntime&group=FOM&usePageConfig=1&appid=root_CaseManagement';
        //return 'app=PortalCaseDetailRuntime&group=FOM&usePageConfig=1&appid=root_Portal';
    },

    getCMSServiceRestUrl: function(uri) {
        return this.siteUrl + 'CMS.WebService/CMSServiceRest.svc/' + uri;
    },

    getRuntimeDomain: function() {
        return this.appBaseDomain;
    },

    getFileNameToUpload: function(fname) {
        if (fname) {
            var now = new Date(),
                reg = /(.*?)(\.[^.]*)?$/,
                date = now.getFullYear() + '' + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
            // date = moment(new Date()).tz(moment.tz.guess()).format('YYYYMMDDHHmmSSS').toString();
            return encodeURIComponent(fname.replace(reg, '$1_' + date + '$2'));
        }
    },

    getFileNameUploaded: function(url) {
        return url.substring(url.length - url.split("").reverse().join("").indexOf("/"), url.length);
    }
};