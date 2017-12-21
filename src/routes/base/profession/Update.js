import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import UEditor from '../../../components/editor/UEditor';
import {
    loadDataProfessionCategoryDataSet,
    loadDataProfessionSubjectDataSet,
    updateDataProfession
} from '../../../service/base';
import LazyLoad from 'react-lazy-load';

const FormItem = Form.Item;

class Update extends Component {
    handleSubmit = (e) => {
        let formData = this.props.form.getFieldsValue();
        formData = {
            ...this.props.data,
            ...formData,
            detail: UE.getEditor('profession_update_detail').getContent(),
            offer: UE.getEditor('profession_update_offer').getContent(),
        };

        setTimeout(()=>{
            updateDataProfession(formData).then(data => {
                this.props.form.resetFields();
                this.props.onCancel();
                message.success("更新成功！");
            }).catch((e) => {
                this.props.doSuccess();
                message.error(e);
            })
        }, 300);


    }

    constructor(props) {
        super(props);
        this.state = {
            subjectList: [],
            categoryList: [],
        }
    }

    componentDidMount() {
        loadDataProfessionCategoryDataSet({rows: 10000, status: 1}).then(data => {
            this.setState({categoryList: data.data.dataSet.rows})
        }).catch((e) => {
            message.error(e);
        })

        loadDataProfessionSubjectDataSet({rows: 10000, status: 1}).then(data => {
            this.setState({subjectList: data.data.dataSet.rows})
        }).catch((e) => {
            message.error(e);
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {profession, professionCode, subjectId, categoryId, revisedYears, degree, detail, salary, offer, undergradPro, remark} = this.props.data;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };

        return (
            <Modal title="更新专业信息" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
                <Row type='flex' style={{marginBottom: '5px'}}>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="专业名称">
                            {getFieldDecorator('profession', {
                                initialValue: profession,
                                rules: [{
                                    required: true, message: '请填写'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="专业代码">
                            {getFieldDecorator('professionCode', {
                                initialValue: professionCode,
                                rules: [{
                                    required: true, message: '请填写'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="所属学科">
                            {getFieldDecorator('subjectId', {
                                initialValue: subjectId + '',
                                rules: [{
                                    required: true, message: '请选择'
                                }]
                            })(
                                <Select placeholder="选择学科" style={{width: '200px'}}>
                                    {
                                        this.state.subjectList.map(item => {
                                            return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="所属门类">
                            {getFieldDecorator('categoryId', {
                                initialValue: categoryId + '',
                                rules: [{
                                    required: true, message: '请选择'
                                }]
                            })(
                                <Select placeholder="选择门类" style={{width: '200px'}}>
                                    {
                                        this.state.categoryList.map(item => {
                                            return <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="修业年限">
                            {getFieldDecorator('revisedYears', {
                                initialValue: revisedYears,
                                rules: []
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="授予学位">
                            {getFieldDecorator('degree', {
                                initialValue: degree,
                                rules: []
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="毕业5年薪酬">
                            {getFieldDecorator('salary', {
                                initialValue: salary,
                                rules: []
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="本科专业">
                            {getFieldDecorator('undergradPro', {
                                initialValue: undergradPro,
                                rules: []
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="专业详情">
                            <UEditor id="profession_update_detail" initValue={detail}/>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="开设院校">
                            <UEditor id="profession_update_offer" initValue={offer}/>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem{...formItemLayout} label="备注">
                            {getFieldDecorator('remark', {
                                initialValue: remark,
                                rules: []
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem wrapperCol={{span: 12, offset: 4}}>
                    <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
                </FormItem>
            </Modal>
        )
    }
}

export default Form.create()(Update);
